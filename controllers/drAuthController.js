const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {validateRegisterNewDoctor,validateLoginForaDoctor,DoctorModel} = require('../models/doctor')
const bcrypt = require('bcryptjs')

/*
@desc dr register
@method post
@route /api/auth/register
@access public
*/
const registerNewDoctor = asyncHandler(async (req,res)=>{
    const {error}=validateRegisterNewDoctor(req.body)
    if(error){
        res.status(400).json(`msg :${error.details[0].message}`)
    }
    let dr = await DoctorModel.findOne({email :req.body.email})
    if(dr){
        res.status(400).json({msg :'dr was registed , you can log in directly '})
    }
    const salt =await bcrypt.genSalt(10)
    req.body.password =await bcrypt.hash(req.body.password,salt)

    dr = new DoctorModel({
        name :req.body.name,
        age :req.body.age,
        gender :req.body.gender,
        email :req.body.email,
        password :req.body.password,
        phone :req.body.phone,
        specialization :req.body.specialization , 
        location : req.body.location,
        workingHour:req.body.workingHour,
        fees: req.body.fees,
        patients : req.body.patients,
        appointments :req.body.appointments,
        role : req.body.role
    })
    
    const result = await dr.save()
    const token = jwt.sign({id:dr._id , name:dr.name ,role :dr.role},process.env.SECRETE_KEY,{expiresIn:"2w"})
    const {password,...other} =result._doc
    res.status(200).json({...other,token})
})
/*
@desc doctor login
@method post
@route /api/auth/login
@access public
*/

const loginAnDr = asyncHandler(async (req,res)=>{
    const {error}=validateLoginForaDoctor(req.body)
    if(error){
        res.status(400).json(`msg :${error.details[0].message}`)
    }
    let dr = await DoctorModel.findOne({email :req.body.email})
    if(!dr){
        res.status(404).json({msg :'email or password was wrong.'})
    }
    const isMatch = await bcrypt.compare(req.body.password,dr.password)
    if(!isMatch){
        res.status(400).json({msg :"email or password was wrong"})
    }
    const token = jwt.sign({id:dr._id , name:dr.name ,role :dr.role},process.env.SECRETE_KEY,{expiresIn:"2w"})
    const {password,...other} =dr._doc
    res.status(200).json({msg : "login sucsessfully" , profile :{...other,token}})

})



module.exports={registerNewDoctor,loginAnDr}


/*
docid          appointment time ||   doctor(docid)   workinghour




*/