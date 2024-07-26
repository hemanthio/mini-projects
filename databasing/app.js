const express = require('express');
const app= express();

const userModel =require('./usermodel')

app.get('/',(req,res)=>{
res.send("vattakai")
})



app.get("/create", async (req,res)=>{
    let createduser = await userModel.create({
        name:"harshita",
        email:"harshasai$gmail.com",
        username:"varshita",
       })
       res.send(createduser)
    })



    app.get("/update", async (req,res)=>{

      let updateduser= await userModel.findOneAndUpdate({username:"vattakai"},{name:"namste friends"},{new:true})
    
        res.send(updateduser)
    })
    
    app.get("/read", async (req,res)=>{
      let users = await userModel.find({});
      res.send(users)
    })

    app.get("/delete", async (req,res)=>{
        let users = await userModel.findOneAndDelete({username:"vattakai"});
        res.send(users)
      })
  

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})