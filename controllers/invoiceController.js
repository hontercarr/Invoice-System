const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Invoice = mongoose.model("Invoice");
const helpers = require("handlebars-helpers")();

router.get("/", (req, res) => {
  res.render("invoice/addOrEdit", {
    viewTitle: "New Invoice"
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") insertRecord(req, res);
  else updateRecord(req, res);
});

function insertRecord(req, res) {
  var invoice = new Invoice();
  invoice.item = req.body.item;
  invoice.date = req.body.date;
  invoice.notes = req.body.notes;
  invoice.amount = req.body.amount;
  invoice.owed = req.body.owed;
  invoice.isPaid = req.body.isPaid;
  invoice.save((err, doc) => {
    if (!err) res.redirect("invoice/list");
    else {
      console.log("Error during record insertion : " + err);
    }
  });
}

function updateRecord(req, res) {
  Invoice.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("invoice/list");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("invoice/addOrEdit", {
            viewTitle: "View Invoice",
            invoice: req.body
          });
        } else console.log("Error during record update : " + err);
      }
    }
  );
}

router.get("/list", (req, res) => {
  Invoice.find((err, docs) => {
    if (!err) {
      res.render("invoice/list", {
        list: docs
      });
    } else {
      console.log("Error in retrieving invoice list " + err);
    }
  });
});

router.get("/paid", (req, res) => {
  Invoice.find((err, docs) => {
    if (!err) {
      res.render("invoice/paid", {
        list: docs
      });
    } else {
      console.log("Error in retrieving invoice list " + err);
    }
  });
});

router.get("/:id", (req, res) => {
  Invoice.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("invoice/addOrEdit", {
        viewTitle: "View Invoice",
        invoice: doc
      });
    }
  });
});

router.get("/delete/:id", (req, res) => {
  Invoice.findByIdAndDelete(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/invoice/list");
    } else {
      console.log("Error in invoice delete :" + err);
    }
  });
});

// View

module.exports = router;
