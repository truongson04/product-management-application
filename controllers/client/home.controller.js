const ProductCategory = require("../../models/product-category.model");
 const helper = require("../../helper/createTree")
module.exports.index = async (req, res)=>{
   const categories = await ProductCategory.find({
    deleted:false,
   })
   const records = helper.createTree(categories);
    res.render("client/pages/home/index", {
        pageTitle: "Home Page",
        categories: records
    })

}
