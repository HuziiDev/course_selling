import jwt from 'jsonwebtoken'


function userMiddleware(req,res,next){
 
     const token = req.headers.token 
     const decoded = jwt.verify(token, process.env.JWT_USER_SECRET)


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

export default userMiddleware