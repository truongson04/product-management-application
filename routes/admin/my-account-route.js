const express = require("express");
const route = express.Router();
const controller = require("../../controllers/admin/my-account.controller");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
const multer = require('multer');
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });
route.get("/", controller.index)
route.get("/edit", controller.getEdit)
route.patch("/edit",upload.single("avatar") , uploadCloud.uploadAvatar, controller.editAccount)
module.exports= route