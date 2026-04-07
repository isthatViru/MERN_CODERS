const mongoose=require('mongoose');
const connection=async ()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/TasksDB')
  console.log("Database Successfully created....")
    } catch (error) {
          console.log("Database connection failed!", error);
    }
}

module.exports=connection;
