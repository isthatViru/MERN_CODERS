const express=require("express");
const app=express();
app.set("view engine",'ejs')
app.use(express.urlencoded({extended:true}))
const Task=require('../todo/model/taskSchema');
const connection = require("./config/db")
connection()
const taskSchema = require("../todo/model/taskSchema");

app.get("/", async (req,res)=>{
    try {
     res.render("home")
    } catch (error) {
        console.log(error)
    }
})


app.post("/add-task", async (req, res) => {
    req.body.status=req.body.status==="on"
     const result=new taskSchema(req.body)
     await result.save()
     console.log(req.body)
     res.redirect("/viewTask")
});

app.get("/viewTask",async (req,res)=>{
    const result= await taskSchema.find()
    res.render('viewTasks',{data:result})
})

app.get("/delete/:id",async (req,res)=>{
    try {
        const id=req.params.id
    await taskSchema.findByIdAndDelete(id)
    res.redirect("/viewTask")
    } catch (error) {
        console.log(error)
    }
})

const PORT=3000;
const HOST='127.0.0.1'
app.listen(PORT,HOST,()=>{
    console.log(`Server is up http://${HOST}:${PORT}`);
})