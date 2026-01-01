const express = require("express");
const router= express.Router ();
const controller = require("../../controllers/client/products.controller")
router.get("/", controller.index);
router.get("/details/:id", controller.getDetails)
// lấy sản phẩm theo danh mục 
router.get("/:productCategory", controller.getProductCategory);
module.exports= router; 