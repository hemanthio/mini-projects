const express = require("express");
const app = express();
const userModel = require("./models/user")
const postModel = require("./models/post")
const path = require("path")
const cookieParser = require("cookie-parser")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/logout",(req,res)=>{
    res.cookie("token","");
    res.redirect("/login");
})

app.get("/login",(req,res)=>{
    res.render("login");
})

app.get("/profile",isLoggedIn,(req,res)=>{
    res.render("profile");
})


// app.post("/register", async  (req,res)=>{
//     let { email, password, name, age, username } = req.body;

// let user = await userModel.find({email})
// if(user) return res.status(400).send("User already registered")

//     bcrypt.genSalt(10, async (err,salt)=>{
//         bcrypt.hash(password,salt, async (err,hash)=>{
//            let user = await userModel.create({
//                 username,
//                 email,
//                 password: hash,
//                 age,
//                 name
//               });

//           let token =  jwt.sign({email:email, userid:user._id},"secretkey");
//           res.cookie("token",token)
//           res.send("User registered successfully")
//         })
//     })


// })


app.post("/register", async (req, res) => {
    let { email, password, name, age, username } = req.body;
  
    let user = await userModel.findOne({ email });
    if (user) return res.status(400).send("User already registered");
  
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.error("Error generating salt:", err);
        return res.status(500).send("Internal server error");
      }
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
          return res.status(500).send("Internal server error");
        }
        try {
          let user = await userModel.create({
            username,
            email,
            password: hash,
            age,
            name
          });
  
          let token = jwt.sign({ email: email, userid: user._id }, "secretkey");
          res.cookie("token", token);
          res.send("User registered successfully");
        } catch (err) {
          console.error("Error creating user:", err);
          res.status(500).send("Internal server error");
        }
      });
    });
  });
  

  app.post("/login", async (req, res) => {
    let { email, password } = req.body;
  
    let user = await userModel.findOne({ email });
    if (!user) return res.status(400).send("Something went wrong");
  
    bcrypt.compare(password,user.password ,  (err,result)=>{
   if(true) res.status(200).send("User logged in successfully")

    else res.redirect("/login")
    })

  });


  function isLoggedIn(req,res,next){
    if(req.cookies.token=== '') res.send("You are not logged in");
    else {
      let data =  jwt.verify(req.cookies.token,"secretkey");
      req.user = data;
    }
    next()
  }

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})