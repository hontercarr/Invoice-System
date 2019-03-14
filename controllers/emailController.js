const express = require("express");
var router = express.Router();

// Email Configuration
router.get('/email', (req, res) => {

    res.render('email/success');
  });

module.exports = router;