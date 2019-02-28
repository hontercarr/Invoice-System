const mongoose = require("mongoose");

var invoiceSchema = new mongoose.Schema({
  item: {
    type: String
  },
  notes: {
    type: String
  },
  date: {
    type: String
  },
  amount: {
    type: String
  },
  owed: {
    type: String
  },
  isPaid: {
    type: String
  },
  invoice_customer: {
    type: String
  }
});

mongoose.model("Invoice", invoiceSchema);
