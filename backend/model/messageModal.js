const mongoose = require('mongoose');


const messageModal = new mongoose.Schema({
    Sender : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    content : {
        type: String,
        trim: true
    },
    chat : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Chat"

    }
})  

const Message =mongoose.model("Message",messageModal );

  module.exports = Message