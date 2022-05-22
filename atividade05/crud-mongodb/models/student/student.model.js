// arquivo js responsável pelo Schema de uma "tabela" (collection)

var mongoose = require('mongoose');

// responsável em criar a collection

var StudentSchema = mongoose.Schema(
 {
 name: {type:String, required:true, max:200},
 course: {type:String, required:true, max:200},
 ira: {type:Number, required:true},
 }
);
// criando o modelo a partir do schema acima, o qual servirá para incluir as instâncias
// (documentos)
var StudentModel = mongoose.model('students', StudentSchema);
// retornando o modelo a ser usado pelo serviço (CRUD).
module.exports = StudentModel;