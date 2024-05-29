const jwt = require ("jsonwebtoken")
const secret = "Parth@123"
function setUser(user){
    
    return jwt.sign({
        id : user?.id,
    },secret,{expiresIn : "30d"})
}



module.exports = {setUser}