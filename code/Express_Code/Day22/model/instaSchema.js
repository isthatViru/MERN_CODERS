const mongoose = require('mongoose')

const instaSchema = new mongoose.Schema({

    userName:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model("insta", instaSchema)