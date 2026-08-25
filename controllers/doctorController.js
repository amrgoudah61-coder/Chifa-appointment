const asyncHandler = require('express-async-handler')
const {DoctorModel,validateUpdateDoctor,validateNewDoctor} = require('../models/doctor')
const {appointmentModel} = require('../models/appointment')
const jwt = require('jsonwebtoken')
/*
@desc get doctors
@method GET
@route /api/doctors/
@access public
*/
// get doctors with speciality in query
const getAlldoctors = asyncHandler(async(req,res)=>{
    const{speciality}=req.query
    if(speciality){
    const drs = await DoctorModel.findOne({specialization :speciality}) 

    if(!drs){
        res.status(404).json({msg :'No doctors exists with this specialities'})
    }else  {
    res.status(200).json(drs)}
    }else {
        const dr = await DoctorModel.find()
        if(!dr){
        res.status(404).json({msg :'No doctors exists'})
        }
        res.status(200).json({msg :'success' , Doctors:dr})
    }
})

/*
@desc get single doctor
@method GET
@route /api/doctor/:id
@access private
*/
const getSingleDoctor= asyncHandler(async(req,res)=>{
    const id = req.params.id
    const Dr = await DoctorModel.findById(id)
    const drAppointments = await appointmentModel.findOne({doctor:id})
    if(!Dr){
        res.status(404).json({msg :'Dr not found'})
    }
    if(drAppointments){
    res.json(Dr,drAppointments).status(200)
    }else {
    res.json(Dr).status(200)
    }
})

/*
@desc update an doctor
@method Put
@route /api/doctor/:id
@access private
*/
const updateAnDoctor = asyncHandler(async(req,res)=>{
    const id = req.params.id
    let dr = await DoctorModel.findById(id)
    if(!dr){
        res.status(404).json({msg : 'Dr not found '})
    }
    const {error}= validateUpdateDoctor(req.body)
    if(error){
        res.status(400).json(`msg :${error.details[0].message}`)
    }
    const updatedDr = await DoctorModel.findByIdAndUpdate(id, {
        $set: {
        name :req.body.name,
        age :req.body.age,
        gender :req.body.gender,
        email :req.body.email,
        password :req.body.password,
        phone :req.body.phone,
        specialization :req.body.specialization , 
        location : req.body.location,
        fees: req.body.fees,
        patients : req.body.patients,
        appointments :req.body.appointments,
        }
    }, { new: true })
    res.status(200).json({msg : 'Updated', data : updatedDr})
})

/*
@desc delete an dr
@method delete
@route /api/doctor/:id
@access private
*/
const deleteAnDoctor = asyncHandler(async(req,res)=>{
    const id = req.params.id
    const dr = await DoctorModel.findById(id)
    if (dr) {
        await DoctorModel.findByIdAndDelete(id)
        res.status(200).json({ msg: ' deleted ' })
    }
    else {
        res.status(404).json({ msg: 'Dr not founded' })
    }
})

module.exports = {getSingleDoctor,getAlldoctors,updateAnDoctor,deleteAnDoctor}

