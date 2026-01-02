const express = require("express");
const route = express.Router();
const controller = require("../../controllers/client/cart.controller");
route.get("/", controller.index)
route.post("/add/:productId", controller.addNewProduct);
route.get("/delete/:productId", controller.deleteProduct)
module.exports= route;