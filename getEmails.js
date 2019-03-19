require("./models/db");
const path = require("path");
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const Invoice = mongoose.model("Invoice");
const Customer = mongoose.model("Customer");

Customer.find({})
    .then(customerU => {
        require('fs').writeFile(

            './my.json',
        
            JSON.stringify(customerU),
        
            function (err) {
                if (err) {
                    console.error(':( something broke here.');
                } else {
                    console.log("Saved latest customer DB to my.json");
                    process.exit();
                }
            }
        );
    })