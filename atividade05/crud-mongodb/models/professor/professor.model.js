// arquivo js responsável pelo Schema de uma "tabela" (collection)

var mongoose = require('mongoose');

// responsável em criar a collection

var ProfessorSchema = mongoose.Schema(
 {
 name: {type:String, required:true, max:200},
 university: {type:String, required:true, max:200},
 degree: {type:String, required:true, max:100},
 }
);
// criando o modelo a partir do schema acima, o qual servirá para incluir as instâncias
// (documentos)
var ProfessorModel = mongoose.model('professors', ProfessorSchema);
// retornando o modelo a ser usado pelo serviço (CRUD).
module.exports = ProfessorModel;