const jwt=require('jsonwebtoken')
const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.authorization
    if(!authHeader){
        return res.status(401).json({
            sucess:false,
            message:"Auth Header is missing"
        })
    }
    const token=authHeader.split(" ")[1]
    if(!token){
        return  res.status(401).json({
            sucess:false,
            message:"Token  is missing"
        })
    }

    try {
        const decoded=jwt.verify(token,process.env.jwtSecretKey)
        req.user=decoded

        next();
    } catch (error) {
         return res.status(401).json({
      sucess: false,
      message: "Invalid Token",
      error: error.message
    }
     )
    }
}

module.exports=verifyToken