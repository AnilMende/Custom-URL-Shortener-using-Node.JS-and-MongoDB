const {v4: uuidv4} = require('uuid');

const USER = require('../models/user.js')

const {setUser} = require('../service/auth.js');


const handleUserSignup = async(req, res) => {

    const {name, email, password} = req.body;

    await USER.create({
        name,
        email,
        password
    });
    return res.redirect("/");
}

const handleUserLogin = async(req, res) => {

    const {email, password} = req.body;

    const user =  await USER.findOne({ email, password });

    if(!user) return res.render("login",{
        error : "Invalid Email or passowrd"
    })

    // const sessionId = uuidv4();
    // setUser(sessionId, user);
    // res.cookie("uid",sessionId);

    const token = setUser(user);
    res.cookie("uid", token);
    return res.redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}