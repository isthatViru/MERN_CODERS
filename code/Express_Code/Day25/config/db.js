const mongoose=require('mongoose')
const connection=async()=>{
  try {
     await mongoose.connect('mongodb://localhost:27017/users2')
   console.log("Database Successfully connected!");
   } catch (error) {
     console.log("Database not connected!",error);
   }
}
module.exports=connection
