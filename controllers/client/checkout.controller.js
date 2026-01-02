const Cart = require("../../models/cart.model");
const Product = require("../../models/product.models");
const productHelper= require("../../helper/products");
const Order = require("../../models/orders.model")
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
    res.render("client/pages/checkout/index.pug", {
        pageTitle:"Checkout", 
        cartDetails: cart
    })
}
module.exports.placeOrder= async (req, res)=>{
    const cartId = req.cookies.cartId;
    const userInfo = req.body;  
    const cart = await Cart.findOne({
        _id:cartId
    })
    let products =[];
    for(const product of cart.products){
        const productObject ={
            product_id: product.product_id,
            price: 0,
            discountPercentage:0, 
            quantity:product.quantity
        }
        const productInfo = await Product.findOne({
            _id: product.product_id
        }).select("price discountPercentage")
        productObject.price= productInfo.price;
        productObject.discountPercentage= productInfo.discountPercentage;
        products.push(productObject);
    }
    const orderObject = {
        cart_id : cartId,
        userInfo:"",
        products:products
    }
    const order = new Order(orderObject);
    await order.save();
    await Cart.updateOne({_id: cartId}, {
        products:[]
    })
    res.redirect(`/checkout/success/${order.id}`)
}
module.exports.successOrder = async (req, res)=>{
    const orderId = req.params.orderId; 
    res.render("client/pages/checkout/success", {
        pageTitle:"Successful order"
    })
}