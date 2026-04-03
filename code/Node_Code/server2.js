const http=require('node:http')
const app=http.createServer((request,response)=>{
    response.write("Hello World")
    response.end()
})
const PORT=1000
const HOST='127.0.0.1'
app.listen(PORT,HOST,()=>{
    console.log("Server Is Succesfully Build...........")
})