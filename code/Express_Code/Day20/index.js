const express=require('express')
const app=express()
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}))
app.use(express.static('public/'))
const connection=require('./config/db')
const userSchema=require("./model/userSchema")
const multer=require('multer')


const storage=multer.diskStorage({
    destination:'public/upload',
    filename:(req,file,callback)=>{
        callback(null,Date.now()+"_"+file.originalname)
    }
})
const upload=multer({storage:storage})

app.get("/",(req,res)=>{
    res.render("home.ejs")
})


app.post("/signup",upload.single('profile'),async(req,res)=>{
    try {
        const{userName,email,phone,password}=req.body;
    const profile=req.file.filename
    const result=new userSchema({userName,email,phone,password,profile})
    result.save()
   res.send("User Registered Successfully")

    } catch (error) {
        console.log(error)
    }
})




const PORT=2000;
const HOST="127.0.0.1";
app.listen(PORT,HOST,()=>{
      console.log(`http://${HOST}:${PORT}`)
})