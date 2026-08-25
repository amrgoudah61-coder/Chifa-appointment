const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {userModel,validateNewUserForRegister,validateLoginForUser} = require('../models/user')
const bcrypt = require('bcryptjs')

/*
@desc user register
@method post
@route /api/auth/register
@access public
*/
const registerNewuser = asyncHandler(async (req,res)=>{
    const {error}=validateNewUserForRegister(req.body)
    if(error){
        res.status(400).json(`msg :${error.details[0].message}`)
    }
    let user = await userModel.findOne({email :req.body.email})
    if(user){
        res.status(400).json({msg :'User was registed , you can log in directly '})
    }
    const salt =await bcrypt.genSalt(10)
    req.body.password =await bcrypt.hash(req.body.password,salt)

    user = new userModel({
        name :req.body.name,
        age :req.body.age,
        gender :req.body.gender,
        email :req.body.email,
        password :req.body.password,
        phone :req.body.phone,
        date_of_birth :req.body.date_of_birth,
        address :req.body.address,
        appointments :req.body.appointments,
        role : req.body.role
    })
    
    const result = await user.save()
    const token = jwt.sign({id:user._id , name:user.name ,role :user.role},process.env.SECRETE_KEY,{expiresIn:"2w"})
    const {password,...other} =result._doc
    res.status(200).json({...other,token})
})
/*
@desc user login
@method post
@route /api/auth/login
@access public
*/

const loginAnUser = asyncHandler(async (req,res)=>{
    const {error}=validateLoginForUser(req.body)
    if(error){
        res.status(400).json(`msg :${error.details[0].message}`)
    }
    let user = await userModel.findOne({email :req.body.email})
    if(!user){
        res.status(404).json({msg :'User not found.'})
    }
    const isMatch = await bcrypt.compare(req.body.password,user.password)
    if(!isMatch){
        
        res.status(400).json({msg :"password was wrong"})
    }
    const token = jwt.sign({id:user._id , name:user.name ,role :user.role},process.env.SECRETE_KEY,{expiresIn:"2w"})
    const {password,...other} =user._doc
    res.status(200).json({msg : "login sucsessfully" , profile :{...other,token}})
console.log(req.user);

})



module.exports={registerNewuser,loginAnUser}