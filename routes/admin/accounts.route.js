const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/account.controller");
const multer = require('multer');
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });
router.get("/", controller.index);
router.get("/create", controller.getCreate);
router.post("/create", upload.single("avatar") , uploadCloud.uploadAvatar,controller.addNewAccount);
router.get("/edit/:id", controller.getEdit)
router.patch("/edit/:id",upload.single("avatar") , uploadCloud.uploadAvatar,controller.editAccount)
module.exports=router;