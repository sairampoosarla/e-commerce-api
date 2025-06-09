const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError, BadRequestError} = require('../errors/index')
const { createTokenUser, attachCookiesToResponse, checkPermissions } = require('../utils')


const getAllUsers = async (req, res) => {
    //here 'name email role' this means, we want to only select the mentioned columns names
    const users = await User.find({role:'user'},'name email role')
    
    //here we are asking to select all the columns except the password column
    //const users = await User.find({role:'user'}).select('-password')
    res.status(StatusCodes.OK).json({users})
}

const getSingleUser = async (req, res) => {
    const id = req.params.id
    const user = await User.findById(id,'name email role')
    if(!user){
        throw new NotFoundError("user is not found")
    }
    await checkPermissions(req.user, user)
    res.status(StatusCodes.OK).json({user})
}

const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({user:req.user})
}

//method one to update the user
//in this we are using the save method which means any code added in the .pre function will be run before saving the document 
const updateUser = async (req, res) => {
    console.log(req.body)
    const {email,name} = req.body
    if(!email || !name) {
        throw new BadRequestError("Please provide all values")
    }
    const user = await User.findOne(
        {_id:req.user.id},
    )
    //console.log(user)
    user.name = name
    user.email = email
    user.save()
    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({res, user: tokenUser})
    res.status(StatusCodes.OK).json({user:tokenUser});

}

// const updateUser = async (req, res) => {
//     console.log(req.body)
//     const {email,name} = req.body
//     if(!email || !name) {
//         throw new BadRequestError("Please provide all values")
//     }
//     const user = await User.findOneAndUpdate(
//         {_id:req.user.id},
//         {email, name},
//         {new: true, runValidators: true}
//     )
//     console.log(user)
//     const tokenUser = createTokenUser(user)
//     attachCookiesToResponse({res, user: tokenUser})
//     res.status(StatusCodes.OK).json({user:tokenUser});

// }

const updateUserPassword = async (req, res) => {

    if (!req.body.oldpassword || !req.body.newpassword){
        throw new BadRequestError("old or new password is missing")
    }
    const id = req.body.id
    const user = await User.findById(id)
    const match = await user.comparePassword(req.body.newpassword)
    if(match){
        throw new BadRequestError("new password can't be same as old password")
    }
    user.password = req.body.newpassword
    await user.save()
    res.status(StatusCodes.OK).send("updateUserPassword")
}

module.exports = { getAllUsers, getSingleUser, showCurrentUser, updateUser, updateUserPassword}