const jwt = require('jsonwebtoken')

//creating a JWT token
const createJWT = ({payload}) => {
    //console.log(payload)
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRE
    })
    //console.log(token)
    return token
}

//verifying if the token provided is valid or not
const isTokenValid = ({token}) => {
    //console.log("inside the jwt function")
    //console.log(token)
    return jwt.verify(token, process.env.JWT_SECRET)
    //console.log()
}

const attachCookiesToResponse = ({res, user}) => {
    //calculating the number of miliseconds in a day
    const oneDay = 1000*60*60*24

    const token = createJWT({payload:user})
    
    //sedning the JWT token created via the cookie insted of send it using the json response
    //we are making the cookie secure only if we are in production
    res.cookie('token', token, {httpOnly:true,expires:new Date(Date.now()+oneDay), secure: process.env.NODE_ENV === "production", signed: true})
}

module.exports = {
    createJWT,
    isTokenValid,
    attachCookiesToResponse
}