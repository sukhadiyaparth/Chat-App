const {Schema ,model} = require("mongoose");
const { createHmac ,randomBytes } = require('node:crypto');

const userModal = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unquie : true
    },
    password : {
        type : String,
        required : true
    },
    salt:{
        type:String,
    },
    img : {
        type : String,
        default : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        required : true
        
    },
},  { timestaps: true }
);

// this is a middelware use for password hash and not use arrow function

userModal.pre('save', function(next) {
    const user =  this; // that is indicate current user 
 console.log(user)
    if(!user.isModified("password"))return;
    const salt = randomBytes(16).toString();// this salt generate rendom key
    const hashPassword = createHmac("sha256", salt ).update(user.password).digest("hex") // syntext:- createHmac("algo", "key" ).upadate("where use update").digest("").
    this.salt = salt;
    this.password = hashPassword;                                                                                                                                                        
   next();
 });



// create virtual function for password match

userModal.static("matchpassword", async function(email , password){
    const user = await this.findOne({email});
    if(!user ) throw new Error("user not found");
     const salt = user?.salt;
     const hashedPassword = user?.password;
     const userProviderPassword = createHmac("sha256", salt ).update(password).digest("hex")

     if(hashedPassword !== userProviderPassword){
        throw   new Error("incorect password")
        
     }
else{
    return user
}
  

})

const User =model("User", userModal)

module.exports = User;