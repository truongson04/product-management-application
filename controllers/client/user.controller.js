const User = require("../../models/users.model");
const md5 = require("md5");
module.exports.register= (req, res)=>{
    res.render("client/pages/user/register", {
        pageTitle:"Register new user"
    })

}
module.exports.registerNewUser= async (req, res )=>{
    const emailCheck = await User.findOne({
        email: req.body.email
    })
    if(emailCheck){
        req.flash("error", "Your email has been used!!");
        res.redirect("/user/register");
        return; 
    }
    req.body.password = md5(req.body.password);
    const user = new User(req.body);
    await user.save();
    res.cookie("tokenUser", user.tokenUser);
    req.flash("success", "Created account successfully");
    res.redirect("/");
}
module.exports.login= async(req, res)=>{
    res.render("client/pages/user/login", {
        pageTitle:"Login"
    })

}
module.exports.loginUser= async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password; 
    const userCheck = await User.findOne({
        email:email, 
        deleted:false
    });
    if(!userCheck){
        req.flash("error","Cannot find your email");
        res.redirect("/user/login");
        return;
    }
    if(md5(password)!==userCheck.password){
        req.flash("error","Wrong password");
        res.redirect("/user/login");
        return;
    }
    if(userCheck.status!=="active"){
        req.flash("error","Your account cannot be used now");
        res.redirect("/user/login");
        return; 
    }
    res.cookie("tokenUser", userCheck.tokenUser);
    res.redirect("/");
}
module.exports.logout= (req, res)=>{
    res.clearCookie("tokenUser");
    req.flash("success", "Logout successfully")
    res.redirect("/")
}