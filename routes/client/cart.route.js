const express = require("express");
const route = express.Router();
const controller = require("../../controllers/client/cart.controller");
route.get("/", controller.index)
route.post("/add/:productId", controller.addNewProduct);
route.get("/delete/:productId", controller.deleteProduct);
route.get("/update/:productId/:productQuantity", controller.updateProduct)
module.exports= route;