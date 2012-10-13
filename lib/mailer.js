var nodemailer = require("nodemailer"),
    smtpTransport = nodemailer.createTransport("SMTP",{
      service: "Gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

module.exports = function(email, category, callback ){
  var message = "Se registro una persona con el " + email + " y categoria " + category + ".",
    mailOptions = {
      from: "Node Workshop Page <jose.romaniello@qraftlabs.com>",
      to: "jose.romaniello@qraftlabs.com, matias.woloski@qraftlabs.com",
      subject: "nuevo participante al workshop",
      text: message,
      html: message
    };
  smtpTransport.sendMail(mailOptions, callback);
};