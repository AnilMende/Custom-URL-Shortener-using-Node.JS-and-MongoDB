const { getUser } = require("../service/auth.js");

// Authentication
function checkForAuthentication(req, res, next){
    // const authorizatonHeaderValue = req.headers['authorization'];
    const tokenCookie = req.cookies?.token;
    req.user = null;

    // if(!authorizatonHeaderValue || !authorizatonHeaderValue.startsWith('Bearer')) return next();
    if(!tokenCookie) return next();

    // const token = authorizatonHeaderValue.split('Bearer')[1];
    const token = tokenCookie;
    const user = getUser(token);

    req.user = user;
    next();
}

// Authorization
function restrictTo(roles = []){
    return function(req, res, next){
        if(!req.user) return res.redirect("/login");

        if(!roles.includes(req.user.role)) return res.end("UnAuthorized")
        
        return next();
    }
}

// async function restrictToLoggedInUsersOnly(req, res,next){

//     // console.log(req);
//     // const userUid = req.cookies?.uid;
//     // const userUid = req.body.token;
//     const userUid = req.headers["authorization"]
   
//     if(!userUid) return res.redirect('/login')
//     const token = userUid.split('Bearer ')[1];

//     const user = await getUser(token);

//     if(!user) return res.redirect('/login');

//     req.user = user;
//     next();
// }

// async function checkAuth(req, res, next){
//     // const userUid = req.cookies?.uid;
//     // const user = await getUser(userUid);

//     const userUid = req.headers["authorization"];
//     const token = userUid.split("Bearer ")[1];

//     const user = await getUser(token);

//     req.user = user;
//     next();
// }

module.exports = {
    // restrictToLoggedInUsersOnly,
    // checkAuth
    checkForAuthentication,
    restrictTo
}