const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')


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


// here .pre('save') means this function will run before saving the document into the database
UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(this.password, salt)
    this.password = hashPassword
    console.log("password has been hashed")
    next()
})

//here we are compairing the password that is provided and the hashed password stored in the database
UserSchema.method.comparePassword = async function(candiatePassword) {
    const isMatch = await bcrypt.comparePassword(candiatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model("User", UserSchema)