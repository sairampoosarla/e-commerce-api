const User = require('../models/User')
const bcrypt = require('bcryptjs')
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

const login = (req, res) => {
    res.send("you have sucessfully logged in")
}


const logout = (req, res) => {
    res.send("you have sucessfull logged out")
}

module.exports = {register, login, logout}