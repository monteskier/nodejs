var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    var db = req.db;
    var collection = db.get('aspirants');
    collection.find({},{}, function(err, docs){
      if(err) res.send("Error en carregar la llista");
      res.render('admin/pages/index', {'aspirants':docs});
    });
  }
});
router.get('/aspirantsCRUD', function(req, res, next){
  if(req.session.user){
    res.render('admin/pages/aspirantsCRUD');//Falta enviar la liasta con todos los usuarios
  }else{
    res.send("No ets administrador");
  }
});
router.post('/insertAspirant',function(req, res, next){
  if(!req.files){
    return res.status(400).send('No files were uploaded.');
  }
  var db = req.db;
  var collection = db.get('aspirants');

  collection.insert({
    "nom":req.body.nom,
    "text":req.body.text,
    "foto":'/images/'+req.body.nom+'.jpg',
    "body": req.body.body,
    "vots": 0
  },function(err, docs){
    if(err){
      return res.send("Error en desar l'aspirant");
    }
    var sampleFile = req.files.sampleFile;
    sampleFile.mv('public/images/'+req.body.nom+'.jpg',function(err){
      if(err){
        return res.status(500).send(err);
      }
      res.redirect('/');
    });
  });

});
router.post('/removeAspirant',function(req, res, next){
  var db = req.db;
  var collection = db.get('aspirants');
  collection.remove({"_id":req.body.obj},function(err,doc){
    if(err) res.end("Error en eliminar el objecte");
    res.end("S'ha eliminat correctament");
  });
});
module.exports = router;
