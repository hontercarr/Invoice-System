require("./models/db");
const path = require("path");
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const Invoice = mongoose.model("Invoice");
const Customer = mongoose.model("Customer");

Invoice.updateOne({_id: "5c8c170cc96b8835c06fb54f"}, {$set: {"isPaid": "True"}}, {new: true}, (err, doc) => {
    if(err){
        console.log("err: " + err);
    }        

});