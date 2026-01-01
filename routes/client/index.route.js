module.exports = (app)=>{
    const productRouters= require("./product.route")
    const homeRouters = require("./home.route");
    const categoryRouters = require("../../middlewares/client/category.middlewares")
    const searchRouters = require("../../routes/client/search.route");
    app.use(categoryRouters.category)// trang nào cũng có danh mục sản phẩm
    app.use("/",homeRouters);
app.use("/products",productRouters);
app.use("/search", searchRouters);
}