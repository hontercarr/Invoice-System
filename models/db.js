const mongoose = require("mongoose");
const pass = "mongodb://localhost:27017/invoices";

mongoose.connect(pass, { useNewUrlParser: true }, err => {
  if (!err) {
    console.log("MongoDB Connection Successful");
  } else {
    console.log("Error in DB connection : " + err);
  }
});

require("./invoice.model");
require("./customer.model");
