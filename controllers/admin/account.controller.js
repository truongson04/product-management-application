
const Account = require("../../models/account.model");
const md5 = require("md5"); // Mã hóa mật khẩu 
const Role = require("../../models/roles.model")
module.exports.index= async (req, res)=>{
    let find ={
        deleted:false
    }
    const accounts = await Account.find(find).select("-password -token");// lấy ra tất cả các trường trừ password và token
    for(account of accounts){
        const role =  await Role.findOne({
            _id: account.role_id,
            deleted:false
        })
        account.role=role.title
    }
  
    res.render("admin/pages/accounts/index.pug", {
        pageTitle:"Accounts Management",
        accounts:accounts
    })
}
module.exports.getCreate = async (req, res)=>{
    const roles = await Role.find({deleted:false});
    res.render("admin/pages/accounts/create", {
        pageTitle:"Add new account", 
        roles:roles
    })

}
module.exports.addNewAccount= async (req, res)=>{
    const emailCheck = await Account.findOne({
        email:req.body.email, 
        deleted:false
    });
    if(emailCheck){
        req.flash("error", "Email has been used !");
        res.redirect("/admin/accounts");
        return;
    }
    req.body.password = md5(req.body.password);
    const account = new Account(req.body);
    await account.save();
    req.flash("success","Created successfully");
    res.redirect("/admin/accounts");
}
module.exports.getEdit= async(req, res)=>{
      let find ={
        _id:req.params.id,
        deleted:false
    }
    const account = await Account.findOne(find);
   const roles = await Role.find({deleted:false});
    res.render("admin/pages/accounts/edit", {
        pageTitle:"Edit accounts",
        account:account,
        roles:roles
    })
}
module.exports.editAccount= async(req, res)=>{
      const emailCheck = await Account.findOne({
        _id:{$ne:req.params.id},
        email:req.body.email, 
        deleted:false
    });
    if(emailCheck){
        req.flash("error", "Email has been used !");
        res.redirect(`/admin/accounts/edit/${req.params.id}`);
        return;
    }
    if(req.body.password){
        req.body.password= md5(req.body.password);

    }
    else{
        delete req.body.password
    }
    await Account.updateOne({_id:req.params.id}, req.body)
    req.flash("success", "Updated successfully!")
    res.redirect(`/admin/accounts/edit/${req.params.id}`)
}