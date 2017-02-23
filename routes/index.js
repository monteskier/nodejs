var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var collection= db.get("aspirants");
  collection.find({},{},function(err, docs){
    if(err) console.log(err);
    res.render('index', { aspirants: docs });
  });

});
module.exports = router;
