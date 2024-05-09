const {Schema ,model} = require("mongoose");


const chatModel = new Schema({
    ChatName : {
        type:String,
        trim : true
    },
    isGroupChat:{
        Boolean:true,
        default:false
    },
    users :[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },],

    lastmessage : {

        type: mongoose.Schema.Types.ObjectId,
        ref:"Message"

    },
    admin : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{
    timestamps : true,
});

const Chat = model("Chat",chatModel)


module.exports = Chat