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

   const token = await User.matchpassword(email,password);


   return res.cookie("token",token).status(200).json({
    message : "Valid User"
   })


   
} catch (error) {
   return resp.status(400).json({
    message : "Not Valid User"
   })
}

})

const alluser = (async(req,res)=>{
    // regex i use for match the word that is avalable in db
    // or is use for or operation in mongodb
    const keyword = req.query.search && {
        $or : [
            {name:{$regex: req.query.search , $options: "i"}},
            {email:{$regex: req.query.search , $options: "i"}},
        ]
    }
 const users  = await User.find(keyword).find({_id:{$ne: req.user._id}})
res.send(users)
})

module.exports = {SignUp ,Login ,alluser}