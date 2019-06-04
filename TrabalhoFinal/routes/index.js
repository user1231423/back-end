var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({
    logged: true
  })
});

/* GET home page after user Login. */
router.get('/home', function (req, res, next) {
  res.json({
    message: "Welcome Home after login!"
  })
});

module.exports = router;
