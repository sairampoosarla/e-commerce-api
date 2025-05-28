const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {BadRequestError, NotFoundError, UnauthenticatedError} = require('../errors/index')
const {StatusCodes} = require('http-status-codes')
const {attachCookiesToResponse} = require('../utils')

const register = async (req, res) => {

    //const {name, email, password} = req.body

    //const salt = await bcrypt.genSalt(10)
    //const hashpassword = await bcrypt.hash(password, salt)

    //req.body.password = hashpassword
    //const tempUser = {name, email, password:hashpassword}

    const user = await User.create({...req.body})

    const tokenUser = {userName: user.name, userId: user._id, userRole: user.role}

    //here we are passing the respose object and the token user to a utils function
    attachCookiesToResponse({res, user:tokenUser})
    //const token = createJWT({payload: tokenUser})
    
    res.status(StatusCodes.OK).json({user:tokenUser})
}

const login = async (req, res) => {

    const {email, password} = req.body

    if (!email || !password) {
        throw new BadRequestError("email or password has not been provided")
    }

    const user = await User.findOne({email})

    if (!user){
        throw new NotFoundError("user is not found")
    }

    const isPasswordCorrect = await user.comparePassword(password)
    
    if(!isPasswordCorrect){
        throw new UnauthenticatedError("Invalid Password")
    }
    const tokenUser = {userName: user.name, userId: user._id, userRole: user.role}

    attachCookiesToResponse({res, user:tokenUser})
    
    res.status(StatusCodes.OK).json({user:tokenUser})

}


const logout = (req, res) => {
    //here we are removing the cookie to a random string
    res.cookie('token', "logout", {httpOnly:true,expires:new Date(Date.now())})
    res.send("you have sucessfull logged out")
}

module.exports = {register, login, logout}