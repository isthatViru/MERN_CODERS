const mongoose=require('mongoose')
const taskSchema =  mongoose.Schema({
    title: { type: String, required: true },
    status: { type: Boolean, default: false }, // true = completed
    dueDate: Date
}, { timestamps: true });

module.exports=mongoose.model('task',taskSchema);