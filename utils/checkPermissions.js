const {BadRequestError} = require('../errors/index')


const checkPermissions = async (reqUser, dbUser) => {
    //console.log(reqUser)
    //console.log(dbUser)
    //checking if the user requested is an admin
    if(reqUser.role === "admin") return;
    //if the user requested is not admin checking if the user is requesting his own info
    if(reqUser.id===dbUser._id.toString) return;
    //if the user requested is not admin and not requesting his own info, then throwing error
    throw new BadRequestError("You don't have sufficent permissions to make this request")
}

module.exports = checkPermissions
