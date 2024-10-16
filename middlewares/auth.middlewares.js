const jwt= require("jsonwebtoken")

function verifyToken(req, res, next){
    try{
            const tokenArr=req.headers.authorization.split(" ")
            const token= tokenArr[1]

            const payload=jwt.verify(token, process.env.TOKEN_SECRET)

            req.payload=payload

            next()

    }catch(error){
        res.status(401).json({message: "Invalid token"})
    }
}

function verifyAdmin(req, res, next) {
    if (req.payload.isAdmin === true) {
        next()
    } else {
        res.status(401).json({message: "User has no admin role"})
    }
}

module.exports= {verifyToken, verifyAdmin}