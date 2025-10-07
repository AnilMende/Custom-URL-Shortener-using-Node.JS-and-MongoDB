const express = require('express');

const { connectToMongoDB } = require('./connect.js');
const urlRoute = require('./routes/url.router.js');

const URL = require('./models/url.js');

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(() => console.log("MongoDB Connected"));

// middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/url', urlRoute);


// Redirects the user to the original URL

app.get('/:shortId', async(req, res) => {

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