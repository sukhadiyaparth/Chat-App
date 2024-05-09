const asyncHandler = require('express-async-handler');
const User = require('../model/userModal')
const {setUser} = require("../config/generateJWT")

const   SignUp = asyncHandler( async    (req,res)=>{
    const{name,email,password,pic} = req?.body;

    if(!name || !email || !password ){
        res.status(401);
        throw new Error("Please Enter All the Feilds")

    };

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400);
        throw new Error("User Allready exists")
    }

   const createUser = await User.create({
    name :name,email:email,password:password,pic :pic
    })

    if(createUser){
        res.status(201).json({
            id : createUser?._id,
            name : createUser?.name,
            email : createUser?.email,
            pic : createUser?.pic,
            JwtToken : setUser(createUser)


        })
    }else{
        res.status(400);
        throw new Error("User Not Found")
    }



});

const Login = asyncHandler(async(req,res)=>{
    const {email,password} = req?.body;
    console.log(email,password)
   //call virtual function
try {

   const user = await User.matchpassword(email,password);


   return res.status(200).json({
    message : "Valid User"
   })


   
} catch (error) {
   return resp.render('signin.ejs',{
       error : "incorrect Password"
   })

}

})


module.exports = {SignUp ,Login}