const verifyRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!roles || !roles.includes(req.user.role)){
            return res.status(404).json({
                success:false,
                message:'permission denied'
            })
        }
        next()
    }
}

module.exports=verifyRoles