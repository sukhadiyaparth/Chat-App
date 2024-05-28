const express = require("express");
const { SignUp , Login,alluser } = require("../controllers/userAuth");
const  { authenticationToken} = require('../middelware/authentication')
const route = express.Router();


route.post("/", SignUp)
route.post("/login", Login)
route.get("/",alluser )


module.exports = route;