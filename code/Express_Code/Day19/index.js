const express=require('express')
const app=express()
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}))
const connection=require('./config/db')
const prodSchema=require("./model/prodSchema")

app.get("/",(req,res)=>{
    res.render("addProduct.ejs")
})

app.post("/addProduct",async(req,res)=>{
    try {
        const result = new prodSchema(req.body);
        await result.save();
        res.redirect("/showProd");
    } catch (error) {
        res.render('error.ejs');
        console.log(error);
    }
})

app.get("/showProd", async (req,res)=>{
    try {

        const result = await prodSchema.find()

        res.render("showProd", { data: result })

    } catch (error) {

        console.log(error)
        res.render("error.ejs")

    }
})

app.post("/delete/:id",async (req,res)=>{
    const id=req.params.id
    await prodSchema.findByIdAndDelete(id);
    res.redirect("/showProd")
})

app.get("/edit/:id", async (req,res)=>{
    try {
        const id=req.params.id;
        const result=await prodSchema.findById(id)
        const obj={data:result}
        res.render("edit.ejs",obj)
    } catch (error) {
         res.render("error.ejs",error)
    }
})
app.post("/update/:id", async (req,res)=>{
    try {
        const id=req.params.id;
        await prodSchema.findByIdAndUpdate(id,req.body)
     res.redirect("/showProd")
    } catch (error) {
         res.render("error.ejs",error)
    }
})




const PORT=3000;
const HOST="127.0.0.1";
app.listen(PORT,HOST,()=>{
      console.log(`http://${HOST}:${PORT}`)
})