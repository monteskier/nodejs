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
  collection.users.findOne({'user':user,'pass':pass},function(err,doc){
    if(err) res.send("error amb la consulta");
    else if(doc.user == user && doc.pass == pass){
      console.log(doc);
      req.session.userId = user;
      req.session.pass = pass;
      res.send("done");
    }else{
      res.send("Usuari o contrasenya incorrectes");
    }
  });
});
module.exports = router;
