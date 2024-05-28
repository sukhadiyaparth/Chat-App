const jwt = require ("jsonwebtoken")
const secret = "Parth@123"
function setUser(user){
    
    return jwt.sign({
        id : user?.id,
    },process.env.JWT_SECRET,{expiresIn : "30d"})
}



module.exports = {setUser}