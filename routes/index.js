var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;
  const collection = db.get('aspirants');
  console.log("Antes de la funcion");
  collection.find({},{sort:{"ord": 1}},function(err, docs){
    if(err) console.log(err);
    res.render('public/pages/index', { 'aspirants': docs });
  });
});
  router.post('/votar', function(req, res, next){
    var dni = req.body.dni;
    var aspirant_id = req.body.aspirant_id;
    var db = req.db;
    var collection = db.get('dni');
    var exp_Reg = /^\d{8}[a-zA-Z]$/;
    var numero;
    if(exp_Reg.test(dni) == true){
      numero = dni.substr(0, dni.length-1,1);
      letr = dni.substr(dni.length-1,1);
      numero = numero % 23;
      letra = "TRWAGMYFPDXBNJZSQVHLCKET";
      letra = letra.substring(numero, numero+1);
        if (letra!=letr.toUpperCase()) {
          res.json({'msg':'Dni erroni, la letra del NIF no correspon'});
        }else{
          collection.findOne({"dni":dni},function(err,doc){
            if(err) res.json({"msg":"Error en la consulta"});
            if(doc){
              res.json({"msg":"Aquest ciutada ja ha efectuat una votació anteriorment"});
            }
            collection.insert({"dni":dni},function(err,doc){
              if(err) res.json({"msg":"Error en inserir un nou dni"});
              collection2 = db.get("aspirants");
              collection2.update({"_id":aspirant_id},{$inc:{vots: +1}},function(err,doc){
                if(err) res.json({"msg":"Error al dessar el vot"});
                res.json({"msg":"Vot efectuat correctament"});
              });
            });
          });

        }
      }else{
        res.json({"msg":"Dni erroni, format no valid"});
      }


});
module.exports = router;
