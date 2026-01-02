const Cart = require("../../models/cart.model");
module.exports.cartId = async (req, res, next)=>{
if(!req.cookies.cartId){
    const cart = new Cart();
    await cart.save();
    res.cookie("cartId", cart.id, {
        expires: new Date(Date.now()+(1000*60*60*24*365))
    })
  
}
else{
    const cart = await Cart.findOne({_id:req.cookies.cartId})
   // lay ra tong so san pham co trong gio hang 
    if(cart){
       if(cart.products && cart.products.length>0){
        let total = cart.products.reduce((sum, current)=>{
           return sum+=current.quantity;
        }, 0)
        cart.total = total;
        res.locals.miniCart= cart;
       }
    }
}
next();
}