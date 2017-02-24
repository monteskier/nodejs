var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.body);
  if(req.session.user) res.render('admin/pages/index');
});

module.exports = router;
