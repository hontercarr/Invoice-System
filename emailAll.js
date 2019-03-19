var webPage = require('webpage');
var page = webPage.create();
const leEmail = require( "./my.json" )

var o = 0; // Set list to 0

var emailAll = function() {
    if(o != leEmail.length) {
        var oneEmail = leEmail[o].email;
        page.open('http://localhost:8080/email/email/' + oneEmail, function(status) {
            console.log('Email to ' + oneEmail + ': ' + status);
        o++; // Add 1 to the total
        emailAll(); // Rerun function
  });
    } else {
        phantom.exit(); //exits phantom when done
    }
}

emailAll();

