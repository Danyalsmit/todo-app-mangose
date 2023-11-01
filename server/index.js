const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/todo.js");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(`mongodb+srv://danyal:danyal@dk.6zdlkec.mongodb.net/SHOP?
retryWrites=true&w=majority`);

app.get("/get",(req,res)=>{
    TodoModel.find()
    .then((result) => {
        res.status(201).json(result); 
      })
      .catch((err) => {
        res.status(500).json({ err: "Internal server error" }); 
      });
})

app.put("/update/:id",(req,res)=>{
  const { id }=req.params;
  TodoModel.findByIdAndUpdate({_id:id},{done: true})
  .then((result) => {
    res.status(201).json(result); 
  })
  .catch((err) => {
    res.status(500).json({ err: "Internal server error" }); 
  });
})

app.delete("/delete/:id",(req,res)=>{
  const { id }=req.params;
  TodoModel.findByIdAndDelete({_id:id})
  .then((result) => {
    res.status(201).json(result); 
  })
  .catch((err) => {
    res.status(500).json( err); 
  });
})




app.post("/add", (req, res) => {
  const task = req.body.task;

  if (!task) {
    return res.status(400).json({ error: "Task is required" });
  }

  TodoModel.create({ task: task })
    .then((result) => {
      res.status(201).json(result); 
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal server error" }); 
    });
});

app.listen(8000, () => {
  console.log("server is running");
});
