const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError, BadRequestError} = require('../errors/index')


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
    res.status(StatusCodes.OK).json({user})
}

const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({user:req.user})
}

const updateUser = async (req, res) => {
    res.send("updateUser")
}

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