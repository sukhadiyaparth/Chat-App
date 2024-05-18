const asyncHandler = require('express-async-handler');
const Chat = require('../model/chatModal');
const User = require('../model/userModal')



// @description     Fetch all chats for a user
//@route           GET /api/chat/

const accessChat = asyncHandler(async(req,res)=>{
    const {uid} =req?.body

    if (!uid){
        console.log("UserId param not sent with request");
        return res.status(400);
    }
// this code is use for create chat with db
//.....
    var isChat = Chat.find({
        isGroupChat:false,
        $and : [
            {users : {$elemMatch:{$eq:req.user._id }}},
            {users : {$elemMatch:{ $eq:uid }}},

        ]

        
    }).populate('users',"-password")
    .populate(" lastmessage")

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name  img email",
      });
    
      if (isChat.length > 0) {
        res.send(isChat[0]);
      } else {
        var chatData = {
          chatName: "sender",
          isGroupChat: false,
          users: [req.user._id, userId],
        }};
//......

    
        try {
          const createdChat = await Chat.create(chatData);
          const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
            "users",
            "-password"
          );
          res.status(200).json(Fu1llChat);
        } catch (error) {
          res.status(400);
          throw new Error(error.message);
        }
});



// @description     Fetch all chats for a user
//@route           GET /api/chat/

const fetchChats = asyncHandler(async (req, res) => {
    try {
      Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email",
          });
          res.status(200).send(results);
        });
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });

  const  createGroupChat = asyncHandler(async(req,res)=>{
        if(!req.body.user || !req.body.name ){
          return res.status(4000).send({message : "Please Fill the feilds"})

        }

        var users = JSON.parse(req.body.users)

        if(users.length <2){
          return res.status(400).send("More than 2 users are required to form a group chat");

        }

        users.push(req.user);
        try {
          
          const groupchat =  await Chat.create({
            ChatName : req.body.name,
            users : users,
            isGroupChat :true,
            groupAdmin : req.user
          });

          const fullgroupChat = await Chat.findOne({id : groupchat._id}).populate("users","-password").populate("groupAdmin","-password");
          res.status(200).json(fullgroupChat);
          
        }
        catch(error){
            res.status(400);
            throw new Error(error.message)
        }
  })


module.exports ={accessChat, fetchChats ,  createGroupChat}