const mongoose = require('mongoose')
const { required } = require('joi')
const moment = require('moment')
const appointmentSchema =new mongoose.Schema({
    name :{type:String , required:true , minlength:3 ,maxlength:200},
    patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },

    doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
    },
    appointmentTime: { type: Date, required:true },
    status: {
        type: String,
        enum: ["booked", "UN completed", "canceled"],
        default: "booked",
    }, 
    reason :{type :String , required:true}

},{timestamps:true})

const appointmentModel = mongoose.model('Appointment',appointmentSchema)
module.exports = {appointmentModel}