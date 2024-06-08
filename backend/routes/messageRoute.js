const express = require("express");
const { protect } = require("../middelware/authentication");
const {sendMessage , featchAllMessages} =require('../controllers/messageController')
const route = express.Router()


route.post("/",protect,sendMessage)
route.get("/:chatId",protect,featchAllMessages)


module.exports = route;