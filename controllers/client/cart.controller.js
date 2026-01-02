const Cart = require("../../models/cart.model");
const Product = require("../../models/product.models");
const productHelper= require("../../helper/products");
module.exports.addNewProduct = async (req, res)=>{
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);
    const cartId = req.cookies.cartId;

     const cart = await Cart.findOne({
        _id: cartId
    })
    const productCheck = cart.products.find((items)=>{
     return items.product_id==productId
    })
    if(productCheck){
        // câu lệnh update giá trị của mảng nếu mảng là thuộc tính trong mongodb
        await Cart.updateOne({_id:cartId, "products.product_id":productId}, {
            $set:{
                "products.$.quantity":productCheck.quantity+quantity
            }
        })
   
    }
    else{
        const product = {
        product_id: productId,
        quantity:quantity,

    };
     await Cart.updateOne({_id: cartId}, {
        $push:{products:product}
    })
}
 req.flash("success", "Add new products successfully !!")
    res.redirect("/");

    }
module.exports.index = async (req, res)=>{
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({
        _id: cartId
    })
    if(cart.products.length>0){
       // lấy ra các trường cần thiết 
        for(const item of cart.products){
            const productId = item.product_id;
            const productInfo = await Product.findOne({
                _id: productId, 
                deleted: false
            }).select("title thumbnail price discountPercentage")
            item.productInfo = productInfo;
            
        }
        // sua lai gia 
        let infoList = cart.products.map((items)=>{
            return items.productInfo;
        })
        infoList= productHelper.getNewPrice(infoList);
        for(let i=0; i<cart.products.length; i++){
            cart.products[i].productInfo= infoList[i];
        }

    }
    // tinh tong don hang
    cart.totalPrice = cart.products.reduce((sum, current)=>{
        return sum+=(current.quantity*current.productInfo.priceNew)
    }, 0)
    res.render("client/pages/cart/index.pug", {
        pageTitle: "Cart",
        cartDetails: cart
    });
}
module.exports.deleteProduct= async (req,res)=>{
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    // cau lenh xoa ban ghi trong mang trong mongodb
    await Cart.updateOne({_id: cartId},{
        $pull:{products:{product_id:productId}}
    }

     )
     req.flash("success", "Deleted successfully")
     res.redirect("/cart");
    
}
module.exports.updateProduct= async (req, res)=>{
    const productId = req.params.productId;
    const productQuantity= req.params.productQuantity;
    const cartId = req.cookies.cartId;
    await Cart.updateOne({_id: cartId, "products.product_id":productId}, {
        $set:{
            "products.$.quantity":productQuantity
        }

    })
   req.flash("success", "Update product's quantity successfully !!")
   res.redirect("/cart");
}