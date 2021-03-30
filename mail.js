const nodemailer = require('nodemailer');

var address = "email";
//Will need to use app password for gmail
var password = "password";

var gmailOptions = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: address,
      pass: password
    }
  }
var transport = nodemailer.createTransport(gmailOptions)


function sendEmail(name, email, subject){
    var message = {
        from: "ssanyam103@gmail.com",
        to: email,
        subject: subject,
        text: "Hello, "+name+". Thanks for being a test subject, here is your certificate",
        attachments: [
            {
                filename: "Certificate.jpg",
                path: "./genCert/cert-"+name+".jpg"
            }
        ]
    }
    transport.sendMail(message, (err, info)=>{
        if(!err){
            console.log(info);
        }
        else{
            console.log(err)
        }
    });
}
module.exports = sendEmail;