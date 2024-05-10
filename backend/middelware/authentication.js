const { getUser} = require("../config/generateJWT")

function checkAuthenticationcookie(cookieName){
return (req,res,next)=>{

    // get the cookie 
    const tokencookievalue = req.cookies[cookieName]

    if(!tokencookievalue){
return next();
    }

    try {
        const   userpayload =  getUser(tokencookievalue)
        req.user = userpayload
        console.log(req.user)
    } catch (error) {
            
    }
 return   next();
}
}

module.exports = {checkAuthenticationcookie}