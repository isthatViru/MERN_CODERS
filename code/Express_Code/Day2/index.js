const express=require('express')
const app=express();
app.use(express.static('./public'))
const menu=`
<ul>
<li><a href='/'> Home </a> </li>
<li><a href='/about'> About Us </a> </li>
<li><a href='/contact'> Contact </a> </li>
</ul>
`

app.get('/',(req,res)=>{
    res.send(menu+`<h1> Home Page...... </h1>`)
})

app.get('/about',(req,res)=>{
    res.send(menu+`<h1> About Us Page...... </h1>
        <img src='image.jpg' alt="Office Image" />
        `)
})
app.get('/contact',(req,res)=>{
    res.send(menu+`<h1> Contact Us Page...... </h1>`)
})
app.use((req,res)=>{
    res.send(
        `
        <h1 style={color=red}> 404 Page not found </h1>
        `
    )
})

const PORT=3000;
const HOST='127.0.0.1'
app.listen(PORT,HOST,()=>{
    console.log(`server is running on http://${HOST}:${PORT}`)
})
