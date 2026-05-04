const express = require('express');
const bcrypt = require('bcryptjs');
const Router = express.Router();
const User = require('../model/userSchema');
const jwt=require("jsonwebtoken");
const verifyToken = require('../middlewares/authMiddleware');
const verifyRoles = require('../middlewares/authorizedRoles');
Router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Request Body:", req.body);

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2. Check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    //Token

   if(user && isMatch){
    const token= jwt.sign({id:user._id,email:user.email,role:user.role},process.env.jwtSecretKey,{expiresIn:'1h'})
       return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: user._id,
        email: user.email,
      },
      token:token
    });
   }

  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});


Router.get('/admin',verifyToken,verifyRoles("admin"),(req,res)=>{
    try {
        return res.status(202).json({
            success:true,
            message:"Admin pannel open"
        })
    } catch (error) {
     return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
     
    }
)
}
}
)
Router.get('/dashboard',verifyToken,(req,res)=>{
    try {
        return res.status(202).json({
            success:true,
            message:"Dashboard pannel open"
        })
    } catch (error) {
     return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    }
     )
}
}
)

module.exports = Router;