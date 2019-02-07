const mongoose = require('mongoose');

mongoose.connect('mongodb://suaw:WW2_kar98@ds125385.mlab.com:25385/invoice', { useNewUrlParser: true }, (err) =>{
  if (!err) { console.log('MongoDB Connection Successful') }
  else { console.log('Error in DB connection : ' + err) }
});

require('./invoice.model');
