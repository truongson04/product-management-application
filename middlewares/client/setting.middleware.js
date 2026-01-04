const generalSettings = require("../../models/setting-general.model");
module.exports.settingGeneral=async (req, res, next)=>{
const settings =await generalSettings.findOne({});
res.locals.settingsGeneral= settings;
next();
}