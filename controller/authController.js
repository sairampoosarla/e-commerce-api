

const register = (req, res) => {
    res.send("User has been regstered")
}

const login = (req, res) => {
    res.send("you have sucessfully logged in")
}


const logout = (req, res) => {
    res.send("you have sucessfull logged out")
}

module.exports = {register, login, logout}