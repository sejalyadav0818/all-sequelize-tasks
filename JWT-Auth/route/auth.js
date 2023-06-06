const express = require("express");
const {signupHandler , loginHandler} = require('../controller/authHandler');

const route = express.Router();

// route.post('/login',loginHandler);
route.post("/singup", signupHandler);
route.post("/login", loginHandler);
module.exports = route;