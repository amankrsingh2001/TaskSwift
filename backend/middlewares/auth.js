const jwt = require("jsonwebtoken")

const authMiddleWare = (req,res,next) =>{
    const token = req.headers.authorization;
    if(!token) {
        res.status(401).json({msg:"Token not found"})
    }
    try {
        const word = token.split(' ')
        const jwtToken = word[1];
        const token_decode = jwt.verify(jwtToken,process.env.JWT_SECRET)
        req.body.userId = token_decode.id;
        req.body.email = token_decode.email;
        next();
        
    } catch (error) {
        res.status(400).json({msg:"Auth failed"})
    }
}

module.exports={
    authMiddleWare
}