const dashboardRoutes= require("./dashboard.route")
const productRoutes = require("./product.route")
const productCategoryRoutes = require("./product-category.route");
const roleRoutes = require("./role.route");
const accountRoutes = require("../../routes/admin/accounts.route");
const authRoutes = require("./auth.route");
module.exports = (app)=>{
app.use("/admin/dashboard", dashboardRoutes)
app.use("/admin/products", productRoutes)
app.use("/admin/product-category", productCategoryRoutes);
app.use("/admin/roles", roleRoutes)
app.use("/admin/accounts", accountRoutes);
app.use("/admin/auth", authRoutes);
}