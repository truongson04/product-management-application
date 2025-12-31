const dashboardRoutes= require("./dashboard.route")
const productRoutes = require("./product.route")
const productCategoryRoutes = require("./product-category.route");
const roleRoutes = require("./role.route");
const accountRoutes = require("../../routes/admin/accounts.route");
const authRoutes = require("./auth.route");
const authMiddleware = require("../../middlewares/admin/auth.middleware")
const myAccountRoutes = require("./my-account-route");
module.exports = (app)=>{
app.use("/admin/dashboard", authMiddleware.requireAuth, dashboardRoutes)
app.use("/admin/products", authMiddleware.requireAuth, productRoutes)
app.use("/admin/product-category", authMiddleware.requireAuth, productCategoryRoutes);
app.use("/admin/roles", authMiddleware.requireAuth,roleRoutes)
app.use("/admin/accounts", authMiddleware.requireAuth,accountRoutes);
app.use("/admin/auth", authRoutes);
app.use("/admin/my-account", authMiddleware.requireAuth, myAccountRoutes);
}