const nodemailer = require("nodemailer")
const { generateTemplate } = require("./emailTemplates/mailtemplate")

const transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: process.env.NM_USER,
		pass: process.env.NM_PASSWORD
	}
});

//Sends the email
module.exports.newUserVitae = (email, token) => {
    transporter.sendMail({
        from: `"Centro de día Vitae" <${process.env.NM_USER}>`, 
        to: email, 
        subject: "Bienvenido a Vitae",
        html: generateTemplate(token)
      })
}







