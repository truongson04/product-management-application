const Product = require("../../models/product.models");
module.exports.index= async (req, res)=>{
    const keyword = req.query.keyword;
    if(keyword){
        const regex = new RegExp(keyword, "i");
        const products = await Product.find({
            title: regex,
            deleted:false,
            status: "active"
        })
         res.render("client/pages/search/index.pug", {
    pageTitle:"Search Results",
    keyword:keyword, 
    products:products
 })
       
    }
    else{
        res.send("Product cannot be found")
    }

}