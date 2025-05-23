const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {StatusCodes} = require('http-status-codes')
const {createJWT} = require('../utils')

const register = async (req, res) => {

    //const {name, email, password} = req.body

    //const salt = await bcrypt.genSalt(10)
    //const hashpassword = await bcrypt.hash(password, salt)

    //req.body.password = hashpassword
    //const tempUser = {name, email, password:hashpassword}

    const user = await User.create({...req.body})

    const tokenUser = {userName: user.name, userId: user._id, userRole: user.role}

    const token = createJWT({payload: tokenUser})
    
    //calculating the number of miliseconds in a day
    const oneDay = 1000*60*60*24

    //sedning the JWT token created via the cookie insted of send it using the json response
    res.cookie('token', token, {httpOnly:true,expires:new Date(Date.now()+oneDay)})
    
    res.status(StatusCodes.OK).json({user:tokenUser})
}

const login = (req, res) => {
    res.send("you have sucessfully logged in")
}


const logout = (req, res) => {
    res.send("you have sucessfull logged out")
}

module.exports = {register, login, logout}