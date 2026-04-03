const express=require('express')
const app=express()

app.get('/',(req,res)=>{
    const obj={
        name:'viraj',
        email:'viraj@gamil.com',
        ID:1
    }
    res.render('home.ejs',{obj})

})
const PORT=3000;
const HOST='127.0.0.1'
app.listen(PORT,HOST,()=>{
    console.log(`Server is up http://${HOST}:${PORT}`);
})