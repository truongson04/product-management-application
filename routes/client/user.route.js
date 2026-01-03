const express= require("express");
const route = express.Router();
const controller = require("../../controllers/client/user.controller");
const userAuth= require("../../middlewares/client/auth.middleware")
route.get("/register", controller.register);
route.post("/register", controller.registerNewUser)
route.get("/login", controller.login)
route.post("/login", controller.loginUser)
route.get("/logout", controller.logout)
route.get("/password/forgot", controller.forgotPassword);
route.post("/password/forgot", controller.recoverPassword);
route.get("/password/otp", controller.getOtp);
route.post("/password/otp", controller.handleOtp);
route.get("/password/reset", controller.getReset)
route.post("/password/reset", controller.resetPassword);
route.get("/info",userAuth.requireAuth,controller.getUserInfo);
module.exports= route