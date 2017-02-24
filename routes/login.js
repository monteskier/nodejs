var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('public/pages/login');
});
router.post('/',function(req, res, next){
  var db = req.db;
  var collection = db.get('users');
  var user = req.body.user;
  var pass = req.body.pass;
  collection.findOne({'user':user,'pass':pass},function(err,doc){
    if(err) res.send("error amb la consulta");
    if(doc.user == user && doc.pass == pass){
      res.send("done");
    }else{
      res.send("Usuari o contrasenya incorrectes");
    }
  });

});

module.exports = router;
