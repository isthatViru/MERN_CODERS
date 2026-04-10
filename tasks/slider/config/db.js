const mongoose = require("mongoose")

async function connection(){

try{

await mongoose.connect("mongodb://127.0.0.1:27017/sliderDB")

console.log("MongoDB Connected")

}

catch(error){

console.log("Database connection error:",error)

}

}

module.exports = connection