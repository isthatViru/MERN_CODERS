const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone:{
type:String,
required:true
},

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  profile: {
    type: String,
    required: true,
  },

  createdAt: { type: Date, default: Date.now() },
});
module.exports = mongoose.model("prod", userSchema);
