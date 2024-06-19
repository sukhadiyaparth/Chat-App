const asyncHandler = require('express-async-handler');
const User = require('../model/userModal')
const {setUser} = require("../config/generateJWT")

const       SignUp = asyncHandler( async    (req,res)=>{
    const{name,email,password,img} = req?.body;

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
    name :name,email:email,password:password,img :img
    })
    

    if(createUser){
        res.status(201).json({
            id : createUser?._id,
            name : createUser?.name,
            email : createUser?.email,
            img : createUser?.img,
            JwtToken : setUser(createUser)


        })
    }else{
        res.status(400);
        throw new Error("User Not Found")
    }



});

const Login = asyncHandler(async(req,res)=>{
    const {email,password} = req?.body;
   //call virtual function
try {

   const {user} = await User.matchpassword(email,password);
   return res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    img: user.img,
    JwtToken :setUser(user)
   })


   
} catch (error) {
   return res.status(400).json({
    message : "error"
   })
}

})

const alluser = (async(req,res)=>{
    // regex i use for match the word that is avalable in db
    // or is use for or operation in mongodb
    const keyword = req.query.search ? {
        $or : [
            {name:{$regex: req.query.search , $options: "i"}},
            {email:{$regex: req.query.search , $options: "i"}},
        ]
    }:{};
 const users  = await User.find(keyword)
res.send(users)
})

module.exports = {SignUp ,Login ,alluser}


