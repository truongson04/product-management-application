module.exports = (app)=>{
    const productRouters= require("./product.route")
    const homeRouters = require("./home.route");
    const categoryRouters = require("../../middlewares/client/category.middlewares")
    const searchRouters = require("../../routes/client/search.route");
    const cartMiddlewares = require("../../middlewares/client/cart.middlewares");
    const cartRoutes = require("../../routes/client/cart.route")
    app.use(categoryRouters.category)// trang nào cũng có danh mục sản phẩm
    app.use(cartMiddlewares.cartId)
    app.use("/",homeRouters);
app.use("/products",productRouters);
app.use("/search", searchRouters);
app.use("/cart", cartRoutes);
}