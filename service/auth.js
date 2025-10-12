
// const sessionIdToUserMap = new Map();

// function setUser(id, user) {
//     sessionIdToUserMap.set(id, user);
// }

// function getUser (id){
//    return sessionIdToUserMap.get(id);
// }

const jwt = require('jsonwebtoken');
const secretkey = 'Anil$09';

// this function creates the tokens
function setUser(user){
    return jwt.sign({
        _id : user._id,
        email : user.email,
        role: user.role
    }, secretkey);
}

function getUser(token){

    if(!token) return null;
    return jwt.verify(token, secretkey);
}

module.exports = {
    setUser, getUser
}