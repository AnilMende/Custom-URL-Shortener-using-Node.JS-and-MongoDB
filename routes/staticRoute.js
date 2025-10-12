const express = require('express');
const URL = require('../models/url');
const { restrictTo } = require('../middlewares/auth');

const router = express.Router();

// making a user as admin and giving all the permisions
router.get('/admin/urls', restrictTo(["ADMIN"]), async(req, res) => {
    const allUrls = await URL.find({});
    return res.render("home", {
        urls: allUrls,
    })
})

// this is for displaying all the urls generated 
// in the home page
router.get('/', restrictTo(["NORMAL", "ADMIN"]), async(req, res) => {
    // if(!req.user) return res.redirect("/login");
    const allurls = await URL.find({ createdBy : req.user._id});
    return res.render('home', {
        urls : allurls
    })
})


router.get('/signup', (req, res) => {
    return res.render("signup");
})

router.get('/login',(req, res) => {
    return res.render("login")
} )

module.exports = router;