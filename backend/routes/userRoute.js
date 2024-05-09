const express = require("express");
const { SignUp , Login } = require("../controllers/userAuth");

const route = express.Router();


route.post("/", SignUp)
route.post("/login", Login)


module.exports = route;