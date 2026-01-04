const User = require("../../models/users.model");
const randomHelper = require("../../helper/generateRandom");
const ForgotPassword = require("../../models/forgotPassword.model");
const Cart = require("../../models/cart.model");
const md5 = require("md5");
const sendMailHelper = require("../../helper/sendMail");
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
    // nếu mà user đã có giỏ hàng rồi thì lưu id của họ và cart_id tương ứng vào cookie
    const cart = await Cart.findOne({
        user_id: user.id
    });
    if(cart){
        res.cookie("cartId", cart.id);
    }
    else{
         await Cart.updateOne({
        cartId:req.cookies.cartId
    }, {
        user_id:user.id
    })
    }

   
    
    res.cookie("tokenUser", userCheck.tokenUser);
    res.redirect("/");
}
module.exports.logout= (req, res)=>{
    res.clearCookie("tokenUser");
    res.clearCookie("carId");
    req.flash("success", "Logout successfully")
    res.redirect("/")
}
module.exports.forgotPassword= (req, res)=>{
    res.render("client/pages/user/forgot-password.pug", {
        pageTitle:"Recover password"
    })

}
module.exports.recoverPassword = async (req, res)=>{
    const email = req.body.email;
    const userCheck = await User.findOne({
        email:email, 
        deleted:false
    })
    if(!userCheck){
        req.flash("error", "Cannot find your email");
        res.redirect("/");
        return;
    }
    const otp= randomHelper.generateRandomNumber(6);
    const objForgotPassword = {
        email:email,
        otp: otp,
        expireAt:Date.now()
    }
    const forgot = new ForgotPassword(objForgotPassword);
    await forgot.save();
    const html = `Your otp code is ${otp}. You have 3 minutes to use it`
    sendMailHelper.sendMail(email, "OTP code", html)

    res.redirect(`/user/password/otp/?email=${email}`)
}
module.exports.getOtp = async (req, res)=>{
    const email = req.query.email;
    res.render("client/pages/user/otp-password", {
        pageTitle:" OTP validation",
        email:email
    })
}
module.exports.handleOtp= async (req, res)=>{
    const email = req.body.email;
    const otp = req.body.otp;
    const check = await ForgotPassword.findOne({
        email:email, 
        otp:otp
    })
    if(!check){
        req.flash("error", "OTP is invalid");
        res.redirect("/user/password/otp");
        return; 
    }
    const user = await User.findOne({
        email:email
    });
    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/user/password/reset");

}
module.exports.getReset=(req, res)=>{
    res.render("client/pages/user/reset-password.pug", {
        pageTitle:"Reset password"
    })
}
module.exports.resetPassword=async (req, res)=>{
    const passwordNew = req.body.password;
    const tokenUser = req.cookies.tokenUser;
    await User.updateOne({
        tokenUser:tokenUser
    }, {
        password: md5(passwordNew)
    }

    )
    req.flash("success", "change password successfully")
    res.redirect("/")
    
}
module.exports.getUserInfo= async (req, res)=>{
    const userInfo = await User.findOne({
        tokenUser: req.cookies.tokenUser
    }).select("-password")
    res.render("client/pages/user/info.pug", {
        pageTitle:"User's information", 
        userInfo: userInfo
    })
}
