var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;
  const collection = db.get('aspirants');
  console.log("Antes de la funcion");
  collection.find({},{},function(err, docs){
    if(err) console.log(err);
    res.render('public/pages/index', { 'aspirants': docs });
  });

});
module.exports = router;
