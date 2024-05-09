const jwt = require ("jsonwebtoken")
const secret = "Parth@123"
function setUser(user){
    
    return jwt.sign({
        id : user?.id,
        email : user?.email
    },secret,{expiresIn : "30d"})
}

function getUser(token){
    if(!token) return null
    try {
        return  jwt.verify(token,secret)
    } catch (error) {
        console.log("error",error)
    }
  
}

module.exports = {setUser,getUser}