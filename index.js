const express = require('express');
const path = require('path');

const cookieParser = require('cookie-parser');
const {restrictToLoggedInUsersOnly, checkAuth} = require('./middlewares/auth.js');

const { connectToMongoDB } = require('./connect.js');

const urlRoute = require('./routes/url.router.js');
const staticRoute = require('./routes/staticRoute.js');
const userRoute = require('./routes/user.router.js');

const URL = require('./models/url.js');

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(() => console.log("MongoDB Connected"));

// middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));


app.use('/url',restrictToLoggedInUsersOnly, urlRoute);
app.use('/user', userRoute);
app.use('/', checkAuth, staticRoute);



// Redirects the user to the original URL

app.get('/url/:shortId', async(req, res) => {

    const shortId = req.params.shortId;

   const entry =  await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push : { visitHistory : { timestamp : Date.now() }}
        }
    );

    if(!entry){
        return res.status(404).json({message : "Short URL not found"});
    }
    res.redirect(entry.redirectURL);
});



app.listen(PORT, () => console.log(`Server Started at PORT : ${PORT}`));