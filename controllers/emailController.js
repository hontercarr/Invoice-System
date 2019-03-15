const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");

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

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'retardretard750@gmail.com',
      pass: 'retardretard123'
    }
  });

  var mailOptions = {
    from: 'retardretard750@gmail.com',
    to: emailu,
    bcc: '',
    subject: 'Test',
    html: ''
    // attachments: [{
    //   filename: 'ctivetrips.png',
    //   path: 'http://localhost/img/activetrips.png'
    // }]
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
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







