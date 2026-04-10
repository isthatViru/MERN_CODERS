const mongoose = require("mongoose");

const sliderSchema=mongoose.Schema({

    name:{type:String},
    text:{type:String},
        img:{type:String ,required:true}
})

module.exports   = mongoose.model("slider", sliderSchema);