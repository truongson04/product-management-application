const Cart = require("../../models/cart.model");
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
   