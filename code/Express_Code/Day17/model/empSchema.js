const mongoose=require('mongoose')
const empSchema=mongoose.Schema({
    name:{type:String},
    email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
   role: { type: String },
   isEligible:{type:Boolean},
  createdAt: { type: Date, default: Date.now() },
})
module.exports=mongoose.model("emp",empSchema);