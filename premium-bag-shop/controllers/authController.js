const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {generateToken} = require("../utils/generateToken")
const userModel = require("../models/user-model");

module.exports.registerUser =function(req,res){
    try {
     let {email,password,fullname} = req.body;

    let user =  userModel.findOne({email:email})
    if(user) return res.send("user already exists").status(401)
 
 bcrypt.genSalt(10,(err,salt)=>{
     bcrypt.hash(password,salt,async(err,hash)=>{
         if(err){
             return res.status(500).send("error")
         } else{
             let user = await userModel.create({
                 email,
                 password:hash,
                 fullname
             })
          let token = generateToken(user)
            res.cookie("token",token)
            res.send('user connected successfully')
         }
        
     })
 })
 

    
        
    } catch (error) {
     console.log(error.message);
    }
     }

module.exports.loginUser = async function (req,res){
    let {email,password} = req.body;
let user = await userModel.findOne({email})

if(!user) return res.send("email or password incorrect")

    bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            let token = generateToken(user);
            res.cookie("token",token);
            res.send("you can login nigga")
        }
        else{
           return res.send("email or passowrd incorrect")
        }

    })

}
