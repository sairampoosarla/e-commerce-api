const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please Provide name of the user'],
        minlength: 3,
        maxlength: 20
    },
    email:{
        type: String,
        required: [true, "Please provide email"],
        //here in the validator we are passed a function which check if the email is valid
        validate:{
            //validator package has the function which provides if it is a valid email
            validator: validator.isEmail,
            message: "please provide valid email"
        },
        unique:true
    },
    password:{
        type: String,
        required: [true, 'please provide passsword'],
        minlength:6,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
})

module.exports = mongoose.model("User", UserSchema)