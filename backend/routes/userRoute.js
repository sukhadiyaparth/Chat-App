const express = require("express");
const { SignUp , Login,alluser } = require("../controllers/userAuth");
const route = express.Router();
const { protect } = require("../middelware/authentication");


route.post("/", SignUp)
route.post("/login", Login)
route.get("/",protect,alluser )


module.exports = route;