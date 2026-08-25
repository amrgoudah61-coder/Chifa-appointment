// protect and authorize middleware
const jwt= require('jsonwebtoken')
require('dotenv').config()

function verifyToken(req,res,next){
    const token = req.headers.token

    if(token) {
    try {
        
        const decoded = jwt.verify(token,process.env.SECRETE_KEY)
        req.user = decoded
        
            next()

    } catch (error) {
        res.status(401).json({msg :'invalid token ' ,error}) // invalid token with 401
    }
    }
    else{
        res.status(401).json({msg: 'no token provided'})
    }
}

function verifyTokenAndAutharization (req,res,next){
    verifyToken(req,res,()=>{
        if(req.params.id === req.user.id || req.user.role === "admin"){
            next()
        } else {
            return res.status(403).json({ msg: "forbidden > you are not allaowed " })
        }
    })

}

function verifyTokenAndAdmin(req,res,next){
    verifyToken(req,res,()=>{
        console.log(req.user.role)
        if(req.user.role === "admin"){
            next()
        }
        else {
        return res.status(403).json({ msg: "You are not allaowed 'only admin'" }) // 403 for not allowed

        }
    })
}
// doctor is still not authanticate and autharized
module.exports ={verifyToken,verifyTokenAndAutharization,verifyTokenAndAdmin}