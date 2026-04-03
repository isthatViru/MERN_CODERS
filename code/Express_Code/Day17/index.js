const express=require('express')
const app=express()
app.use(express.urlencoded({extended:true}))
const connection=require('./config/db')
const empSchema=require("./model/empSchema")

app.get("/",(req,res)=>{
    res.render("register.ejs")
})
app.post("/register",async (req,res)=>{
try {
    const result=new empSchema(req.body);
    await result.save();
    res.render("success.ejs")
} catch (error) {
     res.render('error.ejs')
     console.log(error)
}
})

const PORT=3000;
const HOST="127.0.0.1";
app.listen(PORT,HOST,()=>{
      console.log(`http://${HOST}:${PORT}`)
})