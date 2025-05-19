const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {StatusCodes} = require('http-status-codes')

const register = async (req, res) => {

    //const {name, email, password} = req.body

    //const salt = await bcrypt.genSalt(10)
    //const hashpassword = await bcrypt.hash(password, salt)

    //req.body.password = hashpassword
    //const tempUser = {name, email, password:hashpassword}

    const user = await User.create({...req.body})
    
    res.status(StatusCodes.OK).send({user})
}

const login = (req, res) => {
    res.send("you have sucessfully logged in")
}


const logout = (req, res) => {
    res.send("you have sucessfull logged out")
}

module.exports = {register, login, logout}