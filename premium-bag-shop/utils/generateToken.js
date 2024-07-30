const jwt = require("jsonwebtoken")


const generateToken=(user)=>{
    return  jwt.sign({email:user.email,user:user._id},"vattakai")
}

module.exports.generateToken = generateToken