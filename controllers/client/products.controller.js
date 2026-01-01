const Product = require("../../models/product.models")
const productCategory = require("../../models/product-category.model");
const productHelper = require("../../helper/products")
module.exports.index= async(req, res)=>{
const products =   await Product.find({deleted : false}) .sort({position:"desc"});

    res.render("client/pages/products/index", {
        pageTitle: "Product Page",
        products: products
    })


}
module.exports.getDetails= async (req, res)=>{
try{
  const find ={
    deleted: false,
    _id: req.params.id
  }
  const product = await Product.findOne(find);
  
  res.render("client/pages/products/details", {
    pageTitle: product.title,
    product:product
  })
 
}
 catch(err){
    res.redirect("/products")
  }

}
module.exports.getProductCategory= async (req, res)=>{
  const categorySlug = req.params.productCategory;
  try{
     const category = await productCategory.findOne({
    slug: categorySlug,
    deleted:false,
    status:"active"
  })
  // lấy ra các danh mục cha và danh mục con 
  const categoryList = await productHelper.getSubCategory(category._id)
  const categoryIds = categoryList.map((items)=>{
    return items._id
  })
  const products = await Product.find({
    product_category_id: {$in:[category._id, ...categoryIds]},
    deleted:false,
    status:"active"
  }).sort({position:"desc"})
    res.render("client/pages/products/index", {
        pageTitle: category.title,
        products: products
    })

  }
  catch(err){
    res.send("Cannot find your product")
  }
  

}
