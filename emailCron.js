var webPage = require("webpage");
var page = webPage.create();

page.open("http://localhost:8080/email/all", function(status) {
  console.log("Status: " + status);
  setTimeout(function() {
    phantom.exit();
  }, 5000);
});
