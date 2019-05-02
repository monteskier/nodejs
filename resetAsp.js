
function reset(){
var db = connect("localhost:27017/medalla");
  db.dni.remove({});
  print("Eliminats tots els dni que han votat");
  db.aspirants.update({},{$set:{"vots":0}},{multi:true});
  print("Restablerts els vots als candidats");
}
reset();
