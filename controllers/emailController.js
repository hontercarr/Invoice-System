const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");
const Invoice = mongoose.model("Invoice");

var hbs = require("nodemailer-express-handlebars");
//attach the plugin to the nodemailer transporter

// router.get("/email/:email", (req, res) => {
//   let emailtest = req.params;
//   Customer.distinct("email", function(error, ids).then(customers => {
//     let xdmydood = customers[0].fullName;
//     Invoice.find({ invoice_customer: xdmydood }).then(thecustomer => {
//       sendInvoice(emailtest.email, thecustomer);
//     });
//   });
//   res.render("email/email");
// });

router.get("/all", (req, res) => {
  Customer.distinct("email", function(error, ids) {
    const theEmail = ids;
    console.log(theEmail);
    let o = 0;
    const emailAll = function() {
      if (o != theEmail.length) {
        let oneEmail = theEmail[o];
        console.log(oneEmail);
        Customer.find({ email: theEmail }).then(customers => {
          let customerName = customers[0].fullName;
          Invoice.find({ invoice_customer: customerName }).then(thecustomer => {
            sendInvoice(ids, thecustomer);
            console.log(`Email sent successfully`);
          });
          res.render("email/email");
        });
        o++;
        emailAll();
      } else {
        console.log("All emails have been sent!");
      }
    };
    emailAll();
  });
});

// router.get("/all", (req, res) => {
//   Customer.distinct("email", function(error, ids) {
//     sendInvoice(ids);
//   });
// });

function sendInvoice(ids, thecustomer) {
  var nodemailer = require("nodemailer");
  var hbs = require("nodemailer-express-handlebars");
  var options = {
    viewEngine: {
      extname: ".hbs",
      layoutsDir: "views/email/",
      defaultLayout: "template",
      partialsDir: "views/partials/"
    },
    viewPath: "views/email/",
    extName: ".hbs"
  };

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "retardretard750@gmail.com",
      pass: "retardretard123"
    }
  });

  transporter.use("compile", hbs(options));
  transporter.sendMail({
    form: "retardretard750@gmail.com",
    to: ids,
    subject: "CattyShack Invoices",
    template: "email_body",
    context: {
      thecustomer: thecustomer
    }
  });
}

router.get("/test", (req, res) => {
  Customer.find({}).then(customers => {
    res.render("email/test", {
      customers: customers
    });
  });
});

module.exports = router;
