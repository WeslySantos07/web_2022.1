var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

require("./db/mongo.connection") // criando conexeção com o banco

//var studentRoute = require('./routes/student/StudentRoute');
var studentRoute = require('./routes/student/student.routes'); // importando as rotas de student
var professorRoute = require('./routes/professor/professor.routes');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

//app.use('/api/v1/users', users);
app.use('/crud/students', studentRoute);
app.use('/crud/professors', professorRoute);

module.exports = app;