const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model")

router.get("/",(req,res)=>{
res.send("vattakai")
})

router.post("/create", async (req,res)=>{
    let owners = ownerModel.find();
    if(owners.length>0){
        return res.status(503)
        .send("you dont have permission ")
    }

    let {fullname, email, password } = req.body
    let createdOwner = await ownerModel.create({
      fullname,
      email,
      password,
      
     })
     res.status(200).send(createdOwner)
    })
    

module.exports = router;