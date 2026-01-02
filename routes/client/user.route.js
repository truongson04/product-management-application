const express= require("express");
const route = express.Router();
const controller = require("../../controllers/client/user.controller");
route.get("/register", controller.register);
route.post("/register", controller.registerNewUser)
route.get("/login", controller.login)
route.post("/login", controller.loginUser)
route.get("/logout", controller.logout)
module.exports= route