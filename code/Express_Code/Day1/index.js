const express=require('express')
const app=express()

app.get('/',(req,res)=>{
    res.send( ' <h1>Welcome to Express Server</h1> <p>Your server is running successfully.</p>')

})
const PORT=3000;
const HOST='127.0.0.1'
app.listen(PORT,HOST,()=>{
    console.log(`Server is up http://${HOST}:${PORT}`);
})