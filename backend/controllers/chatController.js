const asyncHandler = require('express-async-handler');
const Chat = require('../model/chatModal');
const User = require('../model/userModal')



// @description     Fetch all chats for a user
//@route           GET /api/chat/

const accessChat = asyncHandler(async(req,res)=>{
    const {userId} =req?.body

    if (!userId){
        console.log("UserId param not sent with request");
        return res.status(400);
    }
// this code is use for create chat with db
//.....
// this code find login user id and requted userid
    var isChat = await  Chat.find({
        isGroupChat:false,
        $and : [
          //this is login user user id
            {users : {$elemMatch:{$eq:req?.user?._id }}},
          // this is login current user
            {users : {$elemMatch:{ $eq:userId }}},

        ]

        
    }).populate("users","-password")
    // it means -password = password filed is not 
    //last message populate indicates chat,content, sender filed
    .populate("lastmessage")

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name img email",
      });
    
      // this code for chat exsits
      if (isChat.length > 0) {
        res.send(isChat[0]);
      }
      // it is not exist then create a chat
      else {
        var chatData = {
          chatName: "sender",
          isGroupChat: false,
          users: [req?.user?.id, userId],
        }};
//......

    // this code is create the chat
        try {
          const createdChat = await Chat.create(chatData);
          const FullChat = await Chat.findOne({ id: createdChat?.id }).populate(
            "users",
            "-password"
          );
          res.status(200).json(FullChat);
        } catch (error) {
          res.status(400);
          throw new Error(error.message);
        }
});



// @description     Fetch all chats for a user
//@route           GET /api/chat/

const fetchChats = asyncHandler(async (req, res) => {
    try {

      //find the chat with the user 
      Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
        .populate("users", "-password")
        .populate("admin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          // this result is indicate lattest groupm chat
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
        // this take array of the group user
        var users = JSON.parse(req.body.users)

        if(users.length <2){
          return res.status(400).send("More than 2 users are required to form a group chat");

        }
          // this function for use add the user that is apllay requst to add
        users.push(req.user);
        try {
          // this is create group chat for all user
          const groupchat =  await Chat.create({
            ChatName : req.body.name,
            users : users,
            isGroupChat :true,
            groupAdmin : req.user
          });
          // this return the all user that avalable in group
          const fullgroupChat = await Chat.findOne({id : groupchat.id}).populate("users","-password").populate("groupAdmin","-password");
          res.status(200).json(fullgroupChat);
          
        }
        catch(error){
            res.status(400);
            throw new Error(error.message)
        }
  })

  const  renameGroupChat = asyncHandler(async(req,res)=>{
    const {chatId , chatname} =  req?.body;

    const updateGroupname = await Chat.findByIdAndUpdate(chatId,{
      chatname
    },{
      // that means return updated value
      new:true

    }).populate("users","-password").populate("admin", "-password")
    
    ;

    if(!updateGroupname) {
      res.status(404);
      throw new Error("chat not found")
    }else{
      res.json(updateGroupname)
    }
    
})
const  addToGroup = asyncHandler(async(req,res)=>{
  const {chatId , userId} =  req?.body;

  const added = await Chat.findByIdAndUpdate(chatId,{
    $push :{users:userId}
  },{
    // that means return updated value
    new:true

  }).populate("users","-password").populate("admin", "-password")
  
  ;

  if(!added) {
    res.status(404);
    throw new Error("Chat Not Found")
  }else{
    res.json(added)
  }
  
});


const  removeToGroup = asyncHandler(async(req,res)=>{
  const {chatId , userId} =  req?.body;

  const removeGroup = await Chat.findByIdAndUpdate(chatId,{
    $pull :{users:userId}
  },{
    // that means return updated value
    new:true

  }).populate("users","-password").populate("admin", "-password")
  
  ;

  if(!removeGroup) {
    res.status(404);
    throw new Error("Chat Not Found")
  }else{
    res.json(removeGroup)
  }
  
})


module.exports ={accessChat, fetchChats ,  createGroupChat ,renameGroupChat , addToGroup, removeToGroup}