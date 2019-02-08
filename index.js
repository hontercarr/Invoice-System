require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const invoiceController = require('./controllers/invoiceController');

const app = express();

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

var port = process.env.PORT || 80;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// Auto Emails

app.post('/invoice', (req, res) => {
  const output = `
  <p>Invoice Update</p>
  <h3>Hello ${req.body.fullName}</h3>
  <ul>
    <li>Amount: ${req.body.amount}</li>
    <li>Amount Owed: ${req.body.owed}</li>
  </ul>
  <p>gib the monies pls</p>
  `;
  var nodemailer = require('nodemailer');

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'isaacissupergay@gmail.com',
      pass: 'isaacgay1'
    }
  });

  var mailOptions = {
    from: 'isaacissupergay@gmail.com',
    to: `${req.body.email}`,
    bcc: 'suawdev@gmail.com',
    subject: `${req.body.fullName}'s Invoice Update - Be Adventurous Travel`,
    html: output,
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

      res.render('invoice/list');
    }
  });
});



app.use('/invoice', invoiceController);

