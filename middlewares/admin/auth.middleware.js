const Account = require("../../models/account.model");
const Role = require("../../models/roles.model");
module.exports.requireAuth= async (req, res, next)=>{
    if(!req.cookies.token){
        res.redirect("/admin/auth/login");
        return;
    }
    const user = await Account.findOne({
        token:req.cookies.token,
    }).select("-password")
    if(!user){
      res.redirect("/admin/auth/login");
        return;
    }
    const role = await Role.findOne({_id:user.role_id});
    res.locals.user= user;
    res.locals.role = role;
    next();
}