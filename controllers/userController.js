const asyncHandler = require('express-async-handler')
const {userModel, validateUpdateUser}= require('../models/user')
const {appointmentModel} = require('../models/appointment')

/*
@desc get patients
@method GET
@route /api/user/
@access public
*/
const getAllusers = asyncHandler(async(req,res)=>{
    const users = await userModel.find().populate('appointments')

    if(!users){
        res.status(404).json({msg :'hey not found'})
    }else {
    res.status(200).json(users)}
})

/*
@desc get single user
@method GET
@route /api/user/:id
@access private
*/
const getSingleUser = asyncHandler(async(req,res)=>{
    const id = req.params.id
    const patientAppointment= await appointmentModel.findOne({patient :id})
    const user = await userModel.findById(id).populate('appointments')
    if(!user){
        res.status(404).json({msg :'hey not found'})
    }
    if(patientAppointment){
    res.json( {user,patientAppointment}).status(200)
    }else {
    res.json( {user}).status(200)
    }
})

/*
@desc update an user
@method Put
@route /api/user/:id
@access private
*/
const updateAnUser = asyncHandler(async(req,res)=>{
    const id = req.params.id
    const patientAppointment= await appointmentModel.findOne({patient :id})

    let user = await userModel.findById(id)
    if(!user){
        res.status(404).json({msg : 'user not found '})
    }
    const {error}= validateUpdateUser(req.body)
    if(error){
        res.status(400).json(`msg :${error.details[0].message}`)
    }
    const updatedUser = await userModel.findByIdAndUpdate(id, {
        $set: {
        name :req.body.name,
        age :req.body.age,
        gender :req.body.gender,
        email :req.body.email,
        password :req.body.password,
        phone :req.body.phone,
        date_of_birth :req.body.date_of_birth,
        address :req.body.address,
        appointments :req.body.appointments,
        role:req.body.role
        }
    }, { new: true }).populate('appointments')
    if (patientAppointment){
    res.status(200).json({msg : 'Updated', data : updatedUser,patientAppointment})
    }else {
    res.status(200).json({msg : 'Updated', data : updatedUser})
    }
})

/*
@desc delete an user
@method delete
@route /api/user/:id
@access private
*/
const deleteAnUser = asyncHandler(async(req,res)=>{
    const id = req.params.id
    const user = await userModel.findById(id)
    if (user) {
        await userModel.findByIdAndDelete(id)
        res.status(200).json({ msg: ' deleted ' })
    }
    else {
        res.status(404).json({ msg: 'not founded' })
    }
})

module.exports = {getSingleUser,getAllusers,updateAnUser,deleteAnUser}

