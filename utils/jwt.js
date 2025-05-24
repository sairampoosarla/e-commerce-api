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
    jwt.verify(token, process.env.JWT_SECRET)
}

const attachCookiesToResponse = ({res, user}) => {
    //calculating the number of miliseconds in a day
    const oneDay = 1000*60*60*24

    const token = createJWT({payload:user})
    
    //sedning the JWT token created via the cookie insted of send it using the json response
    res.cookie('token', token, {httpOnly:true,expires:new Date(Date.now()+oneDay)})
}

module.exports = {
    createJWT,
    isTokenValid,
    attachCookiesToResponse
}