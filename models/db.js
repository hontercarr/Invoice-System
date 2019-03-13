const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://suaw:WW2_kar98@invoicing-rw3sx.mongodb.net/test?retryWrites=true",
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
