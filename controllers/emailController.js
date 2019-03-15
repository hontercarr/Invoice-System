const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");

var hbs = require('nodemailer-express-handlebars');
//attach the plugin to the nodemailer transporter


router.get("/email/:email", (req, res) => {
  // res.render("email/email", {
  //   viewTitle: "Email"
  // });
  let emailtest = req.params;
  console.log(emailtest.email);
  // sendInvoice(emailtest)
  sendInvoice(emailtest.email)
  res.render('email/email')
});


function sendInvoice(emailu) {
  var nodemailer = require('nodemailer');
  var hbs = require('nodemailer-express-handlebars');
  var options = {
     viewEngine: {
         extname: '.hbs',
         layoutsDir: 'views/email/',
         defaultLayout : 'template',
         partialsDir : 'views/partials/'
     },
     viewPath: 'views/email/',
     extName: '.hbs'
 };

  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'retardretard750@gmail.com',
      pass: 'retardretard123'
    }
  });
  // transporter.use('compile', hbs(email.hbs));

  // var mailOptions = {
  //   from: 'retardretard750@gmail.com',
  //   to: emailu,
  //   bcc: '',
  //   subject: 'Test',
  //   html: ''
  //   // attachments: [{
  //   //   filename: 'ctivetrips.png',
  //   //   path: 'http://localhost/img/activetrips.png'
  //   // }]
  // };

//   var mailOptions = {
//     from: 'retardretard750@gmail.com',
//     to: emailu,
//     subject: 'Test :)',
//     template: 'email',
//     context: {
//         name: 'Name'
//     }
//  }
  transporter.use('compile', hbs(options));
  transporter.sendMail({
    form: 'retardretard750@gmail.com',
    to: emailu,
    subject: 'CattyShack Invoices',
    template: 'email_body'
  });
}

router.get("/test", (req, res) => {
  Customer.find({})
    .then(customers => {
      res.render('email/test', {
        customers: customers
      });
    });
});

module.exports = router;







