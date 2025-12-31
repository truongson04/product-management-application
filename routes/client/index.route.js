module.exports = (app)=>{
    const productRouters= require("./product.route")
    const homeRouters = require("./home.route");
    const categoryRouters = require("../../middlewares/client/category.middlewares")
    app.use(categoryRouters.category)// trang nào cũng có danh mục sản phẩm
    app.use("/",homeRouters);
app.use("/products",productRouters);
}