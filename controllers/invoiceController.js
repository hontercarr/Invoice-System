const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Invoice = mongoose.model('Invoice');
const helpers = require('handlebars-helpers')();


router.get('/',(req,res) =>{
  res.render('invoice/addOrEdit',{
    viewTitle : "New Invoice"
  });
});

router.post('/',(req, res) =>{
  if (req.body._id == '')
    insertRecord(req, res);
    else
    updateRecord(req, res);
    const output = `
  <h1>CattyShack Invoice Update</h1>
  <h5>Hello ${req.body.fullName}</h5>
  <ul>
    <li>Amount: ${req.body.amount}</li>
    <li>Amount Owed: ${req.body.owed}</li>
  </ul>
  <p>This is an automated message.</p>
  `;
  var nodemailer = require('nodemailer');

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'isaacissupergay@gmail.com',
      pass: 'isaacgay1'
    }
  });

  var mailOptions = {
    from: 'isaacissupergay@gmail.com',
    to: `${req.body.email}`,
    bcc: 'suawdev@gmail.com',
    subject: `${req.body.fullName}'s Invoice Update - CattyShack`,
    html: output,
  // attachments: [{
        // filename: 'ctivetrips.png',
        // path: 'http://localhost/img/'
  // }]
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);

      res.render('invoice/list');
    }
  });
});

function insertRecord(req, res){
  var invoice = new Invoice();
  invoice.fullName = req.body.fullName;
  invoice.email = req.body.email;
  invoice.mobile = req.body.mobile;
  invoice.address = req.body.address;
  invoice.amount = req.body.amount;
  invoice.owed = req.body.owed;
  invoice.isPaid = req.body.isPaid;
  invoice.save((err, doc) =>{
    if (!err)
            res.redirect('invoice/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("invoice/addOrEdit", {
                    viewTitle: "Insert Invoice",
                    invoice: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Invoice.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('invoice/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("invoice/addOrEdit", {
                    viewTitle: 'View Invoice',
                    invoice: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

router.get('/list',(req,res) =>{
  Invoice.find((err, docs) =>{
    if (!err){
      res.render('invoice/list',{
        list: docs
      });
    }
    else {
      console.log('Error in retrieving invoice list ' + err);
    }
  });
});

router.get('/paid',(req,res) =>{
  Invoice.find((err, docs) =>{
    if (!err){
      res.render('invoice/paid',{
        list: docs
      });
    }
    else {
      console.log('Error in retrieving invoice list ' + err);
    }
  });
});

function handleValidationError(err,body){
  for(field in err.errors)
  {
    switch (err.errors[field].path){
      case 'fullName':
        body['fullNameError'] = err.errors[field].message;
        break;
      case 'email':
        body['emailError'] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

router.get('/:id',(req,res) =>{
  Invoice.findById(req.params.id, (err, doc) =>{
    if (!err) {
      res.render('invoice/addOrEdit', {
        viewTitle: "View Invoice",
        invoice: doc
      });
    }
  });
});

router.get('/delete/:id', (req, res) => {
    Invoice.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/invoice/list');
        }
        else { console.log('Error in invoice delete :' + err); }
    });
});

// View

module.exports = router;
