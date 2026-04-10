const express=require('express')
const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.set('view engine','ejs')
const connection=require('./config/db')
connection()

const Slider=require('./model/sliderSchema')

const multer=require('multer')
const storage=multer.diskStorage({
    destination: 'public/uploads',
    filename:(req,file,callback)=>{
    callback(null,Date.now()+"_"+file.originalname)
    }

})

const uploads=multer({storage:storage})


app.get('/',(req,res)=>{
   try {
        res.render('admin.ejs')
      }
    catch (error) {
    console.log("Error Occured"+error)
   }
})

app.get('/admin',(req,res)=>{
    res.render('admin.ejs')
})


app.post('/addProduct',uploads.single('img'),async (req,res)=>{
    try {
        const {name,text}=req.body
          const img = req.file ? req.file.filename : null
        const slider=new Slider({name,text,img})
        console.log(req.body)
console.log(req.file)
    await slider.save()
        res.redirect('/home')
    } catch (error) {
        console.log(error)
    }
})

app.get('/home',async(req,res)=>{
    try {
        const data=await Slider.find()
        
        res.render('home',{data})
    } catch (error) {
        console.log(error)
    }
})
app.get('/delete/:id', async (req,res)=>{
  try {
    const id = req.params.id
    await Slider.findByIdAndDelete(id)
    res.redirect('/home')
  } catch (error) {
    console.log(error)
  }
})

app.get('/edit/:id',async (req,res)=>{
    try {
         const id = req.params.id
       const data=  await Slider.findById(id)
           res.render('edit',{data})
    } catch (error) {
        console.log(error)
    }
})
app.post('/updateProduct/:id', uploads.single('img'), async (req,res)=>{

try{

const id = req.params.id
const {name,text} = req.body

let updateData = { name, text }

// if image uploaded
if(req.file){
updateData.img = req.file.filename
}

await Slider.findByIdAndUpdate(id, updateData)

res.redirect("/home")   // always send response

}

catch(error){
console.log(error)
res.send("Update failed")
}

})


const PORT=3000;
const HOST='127.0.0.1'
app.listen(PORT,HOST,()=>{
    console.log("Server is up http://${HOST}:${PORT}")
})