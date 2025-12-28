const Account = require("../../models/account.model");
const md5 = require("md5");

module.exports.getLogin =(req, res)=>{
   res.render("admin/pages/auth/login.pug", {
    pageTitle:"Login"
   })
}
module.exports.login= async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const user = await Account.findOne({
        email:email, 
        deleted:false
    })
    if(!user){
        req.flash("error", "Email  not exits");
        res.redirect("/admin/auth/login");
        return;
    }
    if(md5(password)!=user.password){
        req.flash("error", "Wrong password");
        res.redirect("/admin/auth/login");
        return;
    }
    if(user.status!="active"){
        req.flash("error", "Your account has been locked!!")
        res.redirect("/admin/auth/login");
        return;
    }
    res.cookie("token", user.token);
   res.redirect("/admin/dashboard")
}