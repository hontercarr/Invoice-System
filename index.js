require('./models/db');
nodemailer = require('nodemailer');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const invoiceController = require('./controllers/invoiceController');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

// Auto Emails

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'beadvtravelreport@gmail.com',
    pass: 'hXA!3hVX:*k#`!~6'
  }
});

var mailOptions = {
  from: 'beadvtravelreport@gmail.com',
  to: '',
  bcc: 'suawdev@gmail.com',
  subject: 'BEAdv Travel - Active Trip Report - Automatic',
  html: 'Here is the report for the week <script> document.write(new Date().toLocaleDateString()); </script>',
 // attachments: [{
      // filename: 'ctivetrips.png',
      // path: 'http://localhost/img/'
// }]
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

app.use('/invoice', invoiceController);

