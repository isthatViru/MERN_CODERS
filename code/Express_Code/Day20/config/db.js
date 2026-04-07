const mongoose=require('mongoose');
const connection=async ()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/SampleDB')
  console.log("Database Successfully created....")
    } catch (error) {
          console.log("Database connection failed!", error);
    }
}
connection();
module.exports=connection;
