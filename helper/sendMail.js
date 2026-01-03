const nodemailer = require("nodemailer");
module.exports.sendMail = (email, subject, html)=>{
    const transporter = nodemailer.createTransport({
        service:"gmail", 
        auth:{
            user:process.env.email_user,
            pass:process.env.email_password
        }
    })
    const mailOptions={
        from: process.env.email_user,
        to:email,
        subject:subject,
        html:html

    }
    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(err)
        }
        else{
            console.log("email has been sent"+info.response);
        }
    })
}