const nodemailer = require("nodemailer")
const { generateTemplate } = require("./emailTemplates/mailtemplate")
const { recoverTemplate } = require("./emailTemplates/recoverTemplate")

const transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: process.env.NM_USER,
		pass: process.env.NM_PASSWORD
	}
});

//Activation email
module.exports.newUserVitae = (email, token) => {
    transporter.sendMail({
        from: `"Centro de día Vitae" <${process.env.NM_USER}>`, 
        to: email, 
        subject: "Bienvenido a Vitae",
        html: generateTemplate(token)
      })
}


//Recover pass email
module.exports.recoverPassEmail = (email, token) => {
  transporter.sendMail({
      from: `"Centro de día Vitae" <${process.env.NM_USER}>`, 
      to: email, 
      subject: "Reseteo de contraseña",
      html: recoverTemplate(token)
    })
}







