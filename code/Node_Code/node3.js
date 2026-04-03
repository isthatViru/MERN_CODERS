const http=require('node:http')
const url=require('node:url')
const app=http.createServer((req,res)=>{
    res.write('<h1>Node JS Server Up..........</h1>')
    const url_link='https://www.google.com/search?q=macbook+pro+m5&oq=macbook+pro&gs_lcrp=EgZjaHJvbWUqCggCEAAYsQMYgAQyEQgAEEUYORhDGLEDGIAEGIoFMhIIARAuGEMYsQMYgAQY5QQYigUyCggCEAAYsQMYgAQyDQgDEC4YsQMYgAQY5QQyEggEEC4YQxixAxiABBjlBBiKBTIKCAUQABixAxiABDIKCAYQABixAxiABDINCAcQLhixAxiABBjlBDIHCAgQABiABDIGCAkQLhhA0gEINDI1MmowajGoAgCwAgA&sourceid=chrome&ie=UTF-8'
    const result=url.parse(url_link,true)
    console.log(result)
    res.end('Response End')
})
const PORT=3000
const HOST='127.0.0.1'
app.listen(PORT,HOST,()=>{
     console.log("Server Is Succesfully Build...........")
})