const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Invoice = mongoose.model('Invoice');

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
});

function insertRecord(req, res){
  var invoice = new Invoice();
  invoice.fullName = req.body.fullName;
  invoice.email = req.body.email;
  invoice.mobile = req.body.mobile;
  invoice.city = req.body.city;
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
                    viewTitle: 'Update Invoice',
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
        viewTitle: "Update Invoice",
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

module.exports = router;
