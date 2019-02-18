require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const customerController = require('./controllers/customerController');
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

app.use('/customer', customerController);

app.use('/invoice', invoiceController);



