const express = require("express");
const { protect } = require("../middelware/authentication");

// const  { authenticationToken} = require('../middelware/authentication')
const  { accessChat, fetchChats, createGroupChat , renameGroupChat , addToGroup , removeToGroup} = require('../controllers/chatController')

const route = express.Router();

//this api is use for  one on one chat
route.post("/",protect, accessChat);


route.get("/",protect,fetchChats);
route.post("/group",protect, createGroupChat);
route.put("/rename",protect, renameGroupChat);
route.put("/groupadd",protect, addToGroup);
route.put("/groupremove",protect, removeToGroup);



module.exports = route;