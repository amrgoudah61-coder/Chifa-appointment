const asynHandler = require('express-async-handler')
const moment = require('moment')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {appointmentModel} = require('../models/appointment')
const {DoctorModel} = require('../models/doctor')

// the main challenge rule of project
const createAnAppointments = asynHandler(async (req, res) => {
    const { doctor: doctorId, appointmentTime, name, patient, status, reason } = req.body;

  // التأكد من وجود الدكتور
    const doctor = await DoctorModel.findById(doctorId);
    if (!doctor) {
    return res.status(400).json({ msg: 'This doctor does not exist' });
    }

  //  التحقق هل الميعاد المطلوب موجود ضمن مواعيد الدكتور
    const isTimeAllowed = doctor.workingHour.some(slot => {
    // مقارنة الوقت كTimestamp عشان نتفادى اختلاف صيغ الـ Strings
    return new Date(slot).getTime() === new Date(appointmentTime).getTime();
    });
    
    if (!isTimeAllowed) {
    return res.status(400).json({ msg: 'this time slot not allowed' });
    }
    // slots rule and main challenge
  //  التحقق هل الميعاد محجوز سابقاً لنفس الدكتور
    const existingAppointment = await appointmentModel.findOne({
    doctor: doctorId,
    appointmentTime: new Date(appointmentTime) // نضمن إنه بيتخزن ويتقارن كـ Date
    });

    if (existingAppointment) {
    return res.status(400).json({ msg: 'This appointment is already booked' });
    }

  // إنشاء الحجز الجديد
    const appointment = new appointmentModel({
    name,
    patient,
    doctor: doctorId,
    appointmentTime: new Date(appointmentTime),
    status,
    reason
    });

    const result = await appointment.save();

  //  إنشاء التوكن  
    const tokenB = jwt.sign(
    { id: result._id, patient: result.patient, doctor: result.doctor },
    process.env.SECRETE_KEY,
    { expiresIn: '2w' }
    );

    return res.status(200).json({ result, tokenB });
});


// get all apointments
const getAllAppointments = asynHandler(async(req,res)=>{
// const appointments = await Appointment.find();

    const appointments = await appointmentModel.find()
    if(!appointments){
        res.status(404).json({msg : 'No appointments found'})
    }
    // format appoinment time in a simple shape
const formattedAppointments = appointments.map((appointment) =>
    ({...appointment.toObject(),
    appointmentTime: moment(appointment.appointmentTime).format('lll'),
}));
    res.status(200).json({msg :'done',data :formattedAppointments})
})
// get my appointment by appointment token
const getSingleAppointment= asynHandler(async(req,res)=>{
    const myId= req.user.id
    // console.log(me);
    const appointment = await appointmentModel.findById(myId)
    if(!appointment){
        res.status(404).json({msg :'No appointments booked with this name'})
    }
    res.status(200).json({msg:'successed' , appoitment:appointment})
})

// get single appointment by id
const updateAppointmentStatus = asynHandler(async(req,res)=>{
    const id= req.params.id
    const newStatus= req.body.status
    const newName= req.body.name
    let appointment = await appointmentModel.findById(id)
    

    if(!appointment){
        res.status(404).json({
            msg:'Appointment not found'
        })
    }
    if(req.params.id == appointment.id){
    const updatedAppointmentStatus = await appointmentModel.findByIdAndUpdate(id,{status:newStatus,name :newName},{new:true})
    res.status(200).json({msg:'status updated successfuly' , data :updatedAppointmentStatus})
}else {
    res.status(403).json({msg :'you are not allowed'})
}
})
const cancelAnAppointment = asynHandler(async(req,res)=>{
    const id = req.params.id
        let appointment = await appointmentModel.findById(id)
        if(!appointment){
            res.status(404).json({msg:'Appointment not found'})
        }  
        if(appointment.status==="canceled"){
            appointment = await appointmentModel.findByIdAndDelete(id)
            res.status(200).json({msg:'appointment canceled ' })

     }else {
        res.status(400).json({msg :'cancel your appointment first'})
    }
    
})
module.exports = {createAnAppointments,getAllAppointments,updateAppointmentStatus,cancelAnAppointment,getSingleAppointment}