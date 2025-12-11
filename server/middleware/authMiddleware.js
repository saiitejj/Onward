import jwt from 'jsonwebtoken';
const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({error:'Unauthorized: No token provided'});

    }
    const token=authHeader.split(' ')[1];
    try{
        const payload=jwt.verify(token,process.env.JWT_SECRET);
        req.user=payload;
        next();
    }catch(error){
        return res.status(401).json({error:'Unauthorized: Invalid token'});
    }
}


export default authMiddleware;