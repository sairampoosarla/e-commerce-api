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


module.exports = {
    createJWT,
    isTokenValid
}