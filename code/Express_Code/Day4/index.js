const express =require('express')
const app=express();

app.use(express.static('public'))

app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs')
 app.get('/',(req,res)=>{
    res.render('Product_Form',{message:null,product:null});

 })
  app.post('/display-product',(req,res)=>{
    const product=req.body;
    res.render('display-product',{
        message:'Product submitted!!!',product
    })
  })
  const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});