var nodemailer = require("nodemailer"),
    smtpTransport = nodemailer.createTransport("SMTP",{
      service: "Gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

module.exports = function(email, callback ){
  var mailOptions = {
    from: "Node Workshop Page <jose.romaniello@qraftlabs.com>",
    to: "jose.romaniello@qraftlabs.com, matias.woloski@qraftlabs.com",
    subject: "nuevo participante al workshop",
    text: "Una persona solicito el cupón de pago en la página web: " + email,
    html: "Una persona solicito el cupón de pago en la página web: " + email
  };
  smtpTransport.sendMail(mailOptions, callback);
};