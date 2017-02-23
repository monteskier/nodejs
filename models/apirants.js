var mongoose =require('mongoose'), Schema = mongoose.Schema;
var aspirantsSchema = new Schema({
  nom : {type:String},
  cognoms:{type:String},
  year:{type:Number},
  description : {type:String}
});
module.exports = mongoose.model('Aspirants',aspirantsSchema);
