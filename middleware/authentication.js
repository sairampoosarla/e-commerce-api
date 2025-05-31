const {UnauthenticatedError} = require('../errors/index')
const UnauthorizeError = require('../errors/unauthorize')

const {isTokenValid} = require('../utils/jwt')

const auth = async (req, res, next) => {

    const token = req.signedCookies.token
    if(!token){
        throw new UnauthenticatedError("Authentication Invalid")
    }
    else{
        try{
        const validation = isTokenValid({token})
        req.user = {"name":validation.userName,"id":validation.userId,"role":validation.userRole}
        next()
        }
        catch(error){
        throw new UnauthenticatedError("Autentication has faild")
    }
    }
}

const authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            throw new UnauthorizeError("Insuffecient previliges")
        }
        next()
    }
    
}

module.exports = {auth, authorize}
