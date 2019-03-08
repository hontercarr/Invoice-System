const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/invoice",
  { useNewUrlParser: true },
  err => {
    if (!err) {
      console.log("MongoDB Connection Successful");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);

require("./invoice.model");
require("./customer.model");
