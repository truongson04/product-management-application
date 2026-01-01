const Product = require("../../models/product.models");
const productHelper = require("../../helper/products");
module.exports.index = async (req, res)=>{
   const productList = await Product.find({
    deleted:false,
    status:"active",
    position:{$gt:20}
   })
   const newProducts = productHelper.getNewPrice(productList)

    res.render("client/pages/home/index", {
        pageTitle: "Home Page",
        products: newProducts
        
    })

}
