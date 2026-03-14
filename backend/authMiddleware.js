import jwt from "jsonwebtoken";

const authMiddleware=(req,res,next)=>{
    const token=req.header.authorization;
    if(!token) return res.json({message:"Login First"})
    try{
   const decoded =jwt.verify(token,process.env.JWT_SECRET);
   req.userId=decoded.id;
   next();
}catch(e){
    res.status(401).json({message:"invalid Token"});
}
}

