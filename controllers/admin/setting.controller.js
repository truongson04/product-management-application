const SettingGeneral = require("../../models/setting-general.model");
module.exports.index = async (req, res)=>{
    const settings = await SettingGeneral.findOne({});
    res.render("admin/pages/setting/general.pug", {
        pageTitle:"General Settings", 
        settings:settings
    })
}
module.exports.changeSettings =  async (req, res)=>{
    console.log(req.body)
    const count = await SettingGeneral.countDocuments({});
    if(count==0){
    const setting = new SettingGeneral(req.body);
    await setting.save();
    }
    else{
        await SettingGeneral.updateOne({}, req.body)
    }
    
    res.redirect("/admin/settings/general")
}