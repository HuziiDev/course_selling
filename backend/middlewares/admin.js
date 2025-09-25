import jwt from 'jsonwebtoken'


function adminMiddleware(req,res,next){
 
     const token = req.headers.token 
     const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET)


     if(decoded){
        req.userId = decoded.id
        next()
     }
     else{
        return res.status(403).json({
            message:"Cannot signed in"
        })
     }

}

export default adminMiddleware