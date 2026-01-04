const express = require("express");
const route = express.Router();
const controller = require("../../controllers/admin/setting.controller");
const multer = require('multer');
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

route.get("/general", controller.index);
route.patch("/general",upload.single("logo"), uploadCloud.uploadLogo, controller.changeSettings)
module.exports= route; 