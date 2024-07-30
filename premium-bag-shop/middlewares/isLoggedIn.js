const jwt = require("jsonwebtoken")
const userModel =require("../models/user-model")

model.exports = async function(req,res,next){
if(!req.cookies.token){
    req.flash("error","Please login first")
    return res.redirect("/login")

}

try {
    let decoded = jwt.verify(req.cookies.token,"vattakai");
    let user = await userModel
    .findOne({
email:decoded.email
    }).select("-password")
    req.user = user;
    next();


} catch (error) {
    res.send(err,"something went wrong")
    res.redirect("/")
}


}

