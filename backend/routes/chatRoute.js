const express = require("express");

const  { authenticationToken} = require('../middelware/authentication')
const  { accessChat} = require('../controllers/chatController')

const route = express.Router();

//this api is use for  one on one chat
route.post("/",authenticationToken('token'), accessChat);


route.get("/", authenticationToken('token'),fetchChat);
route.post("/group",authenticationToken('token'), createGroupChat);
route.put("/rename",authenticationToken('token'), renameGroup);
route.put("/groupremove",authenticationToken('token'), removeFromGroup);
route.put("/groupadd",authenticationToken('token'), addToGroup);



module.exports = route;