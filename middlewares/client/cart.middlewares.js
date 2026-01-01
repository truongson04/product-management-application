const Cart = require("../../models/cart.model");
module.exports.cartId = async (req, res, next)=>{
if(!req.cookies.cartId){
    const cart = new Cart();
    await cart.save();
    res.cookie("cartId", cart.id, {
        expires: new Date(Date.now()+(1000*60*60*24*365))
    })
  
}
next();
}