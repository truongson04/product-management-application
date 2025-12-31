const md5 = require('md5');
const Account = require("../../models/account.model");
module.exports.index = (req, res)=>{
    res.render("admin/pages/my-account/index.pug", {
        pageTitle :`${res.locals.user.fullName}'s account`
    })
}
module.exports.getEdit= (req, res)=>{
    res.render("admin/pages/my-account/edit.pug", {
        pageTitle: `Edit ${res.locals.user.fullName}'s account`
    })
}
module.exports.editAccount= async(req, res)=>{
    const id = res.locals.user._id;
    console.log(req.body)
    const emailCheck = await Account.findOne({
        _id: { $ne:id},
        email:req.body.email,
        deleted:false
    })
    if(emailCheck){
        req.flash("error", "Email has been used ")
        return; 
    }
    else{
        if(req.body.password){
            req.body.password=md5(req.body.password);
        }
        else {
            delete req.body.password
        }
    }
    console.log(req.body)
    console.log(id)
    await Account.updateOne({_id:id},req.body)
    req.flash("success","Updated successfully !!")
    res.redirect("/admin/my-account")
}