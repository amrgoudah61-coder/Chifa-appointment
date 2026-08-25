const mongoose = require('mongoose')
const joi = require('joi')
const jwt = require('jsonwebtoken')
const { validateNewUserForRegister } = require('./user')
require('dotenv').config()

// doctor schema
const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age :{type :Number , required : true},
    gender : { type :String , required : true , minlength : 3 , maxlength : 10},
    email: { type: String, maxlength: 200, required: true, unique: true },
    password: { type: String, minlength: 6, maxlength: 200, required: true },
    phone: { type: String, required: true },
    specialization: { type: String, required: true },
    location: { type: String, required: true },
    workingHour:[{ type: Date, required:true }],
    fees: { type: Number},
    patients :{type : mongoose.Schema.ObjectId , ref : "User"},
    appointments :[{
        type : mongoose.Schema.Types.ObjectId,   ref : "Appointment" , default :"un"
    }]
    ,role :{type : String,enum :["doctor","admin"], default : "Doctor"}

},{timestamps :true})

doctorSchema.methods.generateToken = function() {
    return jwt.sign({id: this._id,name:this.name},process.env.SECRETE_KEY,{expiresIn:"2w"})
}

doctorSchema.set('toJSON', {
    transform: function (doc, ret) {
    if (ret.workingHour && Array.isArray(ret.workingHour)) {
        ret.workingHour = ret.workingHour.map(slot => {
        const dateObj = new Date(slot);
        
        // استخراج التاريخ بصيغة YYYY-MM-DD
        const day = dateObj.toISOString().split('T')[0];
        
        // استخراج الوقت بصيغة 12 ساعة (AM/PM)
        const time = dateObj.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        return {day ,time}
        });
    }
    return ret;
    }
});
// doctorSchema.set('toJSON', {
//     transform: function (doc, ret) {
//         if (ret.workingHour && Array.isArray(ret.workingHour)) {
//                 ret.workingHour = ret.workingHour.map(slot =>
//                         new Date(slot).toLocaleTimeString('en-US', {
//                                     hour: '2-digit',
//                                     minute: '2-digit',
//                                     hour12: true
//                                 })
//                             );
//                             }
//                     return ret;
//     }
// });
function validateRegisterNewDoctor(obj){
    const schema = joi.object({
        name :joi.string().trim().min(3).max(200).required(),
        age :joi.number().required(),
        gender : joi.string().required().trim().min(3).max(10),
        email : joi.string().trim().required().email(),
        password :joi.string().trim().required().max(200).min(6),
        phone : joi.string().trim().required().min(11).max(11),
        specialization : joi.string().required().trim(),
        location : joi.string().required().max(100),
        workingHour :joi.array().items(joi.date().required())
        ,
        fees : joi.number(),
        patients : joi.string().trim(),
        appointments : joi.string().trim(),
        role : joi.string().trim()

})
    return schema.validate(obj)
}

// validate a login user 
function validateLoginForaDoctor(obj){
    const schema = joi.object({
        email : joi.string().trim().required().email(),
        password :joi.string().trim().required().max(200).min(8)
})
    return schema.validate(obj)
}

// validate for updating user
function validateUpdateDoctor (obj) {
    const schema = joi.object({
        name :joi.string().trim().min(3).max(200),
        age :joi.number(),
        gender : joi.string().trim().min(3).max(10),
        email : joi.string().trim().email(),
        password :joi.string().trim().max(6).min(200),
        phone : joi.string().trim().min(11).max(11),
        specialization : joi.string().trim(),
        location : joi.string().max(100),
        workingHour : 
        joi.array().items(joi.date().required())
        ,
        fees : joi.number(),
        patients : joi.string().trim(),
        appointments : joi.string().trim(),
        role:joi.string().trim()

    })
    return schema.validate(obj)
}


const DoctorModel = mongoose.model("Doctor", doctorSchema);
module.exports = {DoctorModel,validateRegisterNewDoctor,validateLoginForaDoctor,validateUpdateDoctor}