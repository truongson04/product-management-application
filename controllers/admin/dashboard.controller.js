const ProductCategory = require("../../models/product-category.model");
const Product = require("../../models/product.models");
const Account = require("../../models/account.model");
const User = require("../../models/account.model");
module.exports.dashboard= async (req, res)=>{
    const statistic = {
        categoryProduct:{
            total:await ProductCategory.countDocuments({deleted:false}),
            active:await ProductCategory.countDocuments({deleted:false, status:"active"}),
            inactive:await ProductCategory.countDocuments({deleted:false, status:"inactive"}),
        }, 
        product:{
            total:await Product.countDocuments({deleted:false}),
            active:await Product.countDocuments({deleted:false, status:"active"}),
            inactive:await Product.countDocuments({deleted:false, status:"inactive"})
        }, 
        account:{
            total:await Account.countDocuments({deleted:false}),
            active:await Account.countDocuments({deleted:false, status:"active"}),
            inactive:await Account.countDocuments({deleted:false, status:"inactive"})
        }, 
        user:{
            total:await User.countDocuments({deleted:false}),
            active:await User.countDocuments({deleted:false, status:"active"}),
            inactive:await User.countDocuments({deleted:false, status:"inactive"})
        }
    }
res.render("admin/pages/dashboard/index", {
    pageTitle:"Overall", 
    statistic:statistic
})
}