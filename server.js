var http = require('http');

var express = require('express');
var app = express();

app.use(express.static('./WebContent'));

http.createServer(app)
.listen(process.env.PORT || 4040, function() {
	console.log('Servidor iniciado');
});