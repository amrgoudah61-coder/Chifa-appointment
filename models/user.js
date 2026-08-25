const joi = require('joi')
const mongoose = require('mongoose')

// create a user schema for DB 

const userSchema = new mongoose.Schema({
    name :{type :String , required :true ,minlength :10 ,maxlength:50},
    age: { type: Number, required: true, min: 0 },
    gender: { type: String, enum: ["male", "female"], required: true },
    email: { type: String, maxlength: 200, required: true, unique: true },
    password: { type: String, minlength: 7, maxlength: 200, required: true },
    phone: { type: String, required: true, match:/^(010|012|015)\d{8}$/ },
    date_of_birth: { type: Date, required: true },
    address: { type: String, required: true },
    appointments: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }
    ],
    role : { type : String,
        enum :["user","admin"]
        ,default:"user"
    }
},
{timestamps :true}
)
const userModel = mongoose.model("User",userSchema)


// validate register user

function validateNewUserForRegister(obj){
    const schema = joi.object({
        name :joi.string().trim().min(3).max(200).required(),
        age :joi.number().required(),
        gender : joi.string().required().trim().min(3).max(10),
        email : joi.string().trim().required().email(),
        password :joi.string().trim().required().max(200).min(7),
        phone : joi.string().trim().required().min(11).max(11),
        date_of_birth : joi.string().trim().required(),
        address : joi.string().trim().required().min(3).max(200),
        appointments : joi.string().trim(),
        role : joi.string().trim()


})
    return schema.validate(obj)
}
// validate a login user 
function validateLoginForUser(obj){
    const schema = joi.object({
        email : joi.string().trim().required().email(),
        password :joi.string().trim().required().max(200).min(7)
})
    return schema.validate(obj)
}

// validate for updating user
function validateUpdateUser (obj) {
    const schema = joi.object({
        name :joi.string().trim().min(3).max(200),
        age :joi.number(),
        gender : joi.string().trim().min(3).max(10),
        email : joi.string().trim().email(),
        password :joi.string().trim().max(200).min(6),
        phone : joi.string().trim().min(11).max(11),
        date_of_birth : joi.string().trim(),
        address : joi.string().trim().min(3).max(200),
        appointments : joi.string().trim(),
        role : joi.string().trim()

    })
    return schema.validate(obj)
}


module.exports = {userModel,validateNewUserForRegister,validateLoginForUser,validateUpdateUser}