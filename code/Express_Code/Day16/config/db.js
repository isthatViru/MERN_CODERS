const mongoose=require('mongoose');
const connection=mongoose
.connect('mongodb://localhost:27017/')
.then(()=>{
    console.log("Database Successfully connected!");
})
.catch((err)=>{
console.log("Database not connected!",err);
});
module.exports=connection;