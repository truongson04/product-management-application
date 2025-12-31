const ProductCategory = require("../../models/product-category.model");
const helper= require("../../helper/createTree");
module.exports.category=  async (req, res, next)=>{
 const records = await ProductCategory.find({
    deleted: false
 })
 const categories = helper.createTree(records);
 res.locals.categories= categories;
 next();
}