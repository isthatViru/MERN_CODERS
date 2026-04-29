const mongoose=require('mongoose')
const connection=async()=>{
    try {
      await mongoose.connect(process.env.MONGO_URL)
    } catch (error) {
          console.log("Database not connected!",error);
    }
}
module.exports=connection