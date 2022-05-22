// arquivo js para conexão com o banco de dados MongoDB local

var mongoose = require('mongoose'); // importando o moongoose

var mongoDB_URI = 'mongodb://127.0.0.1:27017/university '; // conexão com o banco local
mongoose.connect(mongoDB_URI,{useNewUrlParser:true});

var db = mongoose.connection; //armazena a conexão em uma variável

/*listeners:  Um objeto tem vários dependentes que são anexados a ele 
quando este objeto muda de estado todos os seus dependentes são avisados*/
db.on('connected',()=>{
 console.log('Mongoose Connected to '+mongoDB_URI);
});
db.on('disconnected',()=>{
 console.log('Mongoose Disconnected to '+mongoDB_URI);
});
db.on('error',(err)=>{
 console.log('Mongoose Error: '+err);
});