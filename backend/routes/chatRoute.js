const express = require("express");

const  { authenticationToken} = require('../middelware/authentication')
const  { accessChat, fetchChats, createGroupChat , renameGroup , addToGroup , removeFromGroup} = require('../controllers/chatController')

const route = express.Router();

//this api is use for  one on one chat
route.post("/", accessChat);


route.get("/", authenticationToken('token'),fetchChats);
route.post("/group",authenticationToken('token'), createGroupChat);
route.put("/rename",authenticationToken('token'), renameGroup);
route.put("/groupadd",authenticationToken('token'), addToGroup);
route.put("/groupremove",authenticationToken('token'), removeFromGroup);



module.exports = route;