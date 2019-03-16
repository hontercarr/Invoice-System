const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");
const Invoice = mongoose.model("Invoice");

var hbs = require('nodemailer-express-handlebars');
//attach the plugin to the nodemailer transporter


router.get("/email/:email", (req, res) => {
  // res.render("email/email", {
  //   viewTitle: "Email"
  // });
  let emailtest = req.params;
  // Debug - Print Email
  // console.log(emailtest.email);
  // sendInvoice(emailtest)
  // sendInvoice(emailtest.email)
  // res.render('email/email')
  Customer.find({email: emailtest.email})
    .then(customers => {
      // Debug - Print clients name
      // console.log(customers[0].fullName);
      let xdmydood = customers[0].fullName;
  Invoice.find({invoice_customer: xdmydood})
    .then(thecustomer => {
      // Debug - Print the customer's entire invoice array
      // console.log(thecustomer);
      sendInvoice(emailtest.email, thecustomer);
    })
    })
    res.render('email/email');
  
});


function sendInvoice(emailu, data) {
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
    template: 'email_body',
    context: {
      data: data
    }
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







