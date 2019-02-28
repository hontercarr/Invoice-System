const mongoose = require("mongoose");

var customerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: "This field is required."
  },
  email: {
    type: String
  },
  mobile: {
    type: String
  },
  address: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Custom validation for email
customerSchema.path("email").validate(val => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Invalid e-mail.");

mongoose.model("Customer", customerSchema);
