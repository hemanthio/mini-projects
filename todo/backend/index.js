const express = require("express");
const { createTodo, updateTodo } = require("./types");
const app = express();
const {todo} = require("./db");
const cors = require("cors")
app.use(express.json());

app.use(cors())

app.post("/todos", async function(req,res){
  const createPayLoad = req.body;
  const parsePayLoad = createTodo.safeParse(createPayLoad);
  if(!parsePayLoad.success){
    res.status(411).json({
        msg:"you sent the wrong inputs"
    })
    return;
  }

  await todo.create({
    title :createPayLoad.title,
    description:createPayLoad.description,
    completed : false

  })
  res.json({
    msg:"Todo created successfully"
  })
})

app.get("/todos",async function(req,res){
  const todos = await todo.find({});
  res.json({
    todos
  })
})


app.put("/completed", async function(req,res){
  const updatePayLoad = req.body;
  const parsePayLoad = updateTodo.safeParse(updatePayLoad)
  if(!parsePayLoad.sucess){
    res.status(411).json({
        msg:"you entered wrong inputs"
    })
    return;
  }
  await todo.update({
    _id :req.body.id
  },{
    completed :true
  })
  res.json({
    msg:"Todo updated successfully"
  })
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})