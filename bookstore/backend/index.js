const express =require("express");
const app =express();
const mongoose = require('mongoose')

app.use(express.json() )
app.get("/",(req,res)=>{
  res.send("hello server")
})
const dotenv = require("dotenv")
dotenv.config()

const connectDB = async ()=>{
  
  try{
    await mongoose.connect(process.env.MONGODB_URI)
console.log("database connected successfully")
app.on("error",(err)=>{
  console.log(err,"error in connecting to database")
  throw err
})

  }catch(err){
    console.log(err,"error in connecting to database")
  }

}

connectDB();

const userSchema = new mongoose.Schema({
  name:String,
  email:String,
  password:String
})
user = mongoose.model("user",userSchema)

app.post("/register",async(req,res)=>{
  const {name,email,password} = req.body
  const newUser = new user({
    name,email,password
  })


  await newUser.save()
  res.send("user registered successfully")

})
app.listen(process.env.PORT,()=>{
  console.log(`connected to server on port ${process.env.PORT}`);
})