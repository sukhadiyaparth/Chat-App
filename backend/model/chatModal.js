const mongoose = require('mongoose');


    const chatModel = new mongoose.Schema({
        ChatName : {
            type:String,
            trim : true
        },
        isGroupChat:{
            type: Boolean,
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

    const Chat =mongoose.model("Chat",chatModel)


    module.exports = Chat