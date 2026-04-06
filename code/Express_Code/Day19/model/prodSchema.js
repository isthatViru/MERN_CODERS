const mongoose=require('mongoose')
const prodSchema=mongoose.Schema({
    ProductName: { type: String, required: true},
  Category: { type: String },
   price: { type: Number },
   inStock:{type:Boolean},
  createdAt: { type: Date, default: Date.now() },
})
module.exports=mongoose.model("prod",prodSchema);