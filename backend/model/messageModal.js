const {Schema ,model} = require("mongoose");


const messageModal = new Schema({
    Sender : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    content : {
        type: String,
        trim : true
    },
    chat : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Chat"

    }
})  

const Message =model("Message",messageModal );

  module.exports = Message