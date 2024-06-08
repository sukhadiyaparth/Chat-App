const asyncHandler = require('express-async-handler');
const Message = require('../model/messageModal')
const User = require('../model/userModal');
const Chat = require('../model/chatModal');
const { response } = require('express');


const sendMessage = asyncHandler(async(req,res)=>{
    const {content , chatId} =req?.body

    if (!content &&  !chatId){
        console.log("invalid user");
        res.status(400)
    }

    var createMessage ={
        Sender : req?.user,
        content : content,
        chat : chatId
    }
    try {
        var message = await Message.create(createMessage)

        message = await message.populate("Sender", "name img")
        message = await message.populate("chat")

        // this code is use for nested population
        message = await User.populate(message, {
            path: "chat.users",
            select: "name img email",
          });
          await Chat.findByIdAndUpdate(req?.body?.chatId,{
            lastmessage : message
           })

           res.json(message)

    } 
    

    
    
    catch (error) {
        res.status(400);
    throw new Error(error?.message);
    }

  
});

const featchAllMessages = asyncHandler(async(req,res)=>{
try {
    const message = await Message.find({chat : req?.params?.chatId})
    .populate("Sender", "name img email")
      .populate("chat");
    res.json(message);
} catch (error) {
    res.status(400);
    throw new Error(error.message);
}
})


module.exports ={sendMessage , featchAllMessages}