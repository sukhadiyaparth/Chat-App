const { getUser} = require("../config/generateJWT")
const User = require("../model/userModal")






  const authenticationToken = (cookieName)=>{
    return async(req,res,next)=>{

             try {
                // get the cookie 
            const tokencookievalue = req.cookies[cookieName]
                const   userpayload =  getUser(tokencookievalue);
                req.user = await User.findById(userpayload.id).select("-password");
  
                 next();
               
            } catch (error) {
                res.status(401);
                throw new Error("Not authorized, token failed");
            }

            if (!token) {
                res.status(401);
                throw new Error("Not authorized, no token");
              }
              return next()
        }
  }

  module.exports = { authenticationToken };