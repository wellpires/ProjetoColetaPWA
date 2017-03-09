var http = require('http');

var express = require('express');
var app = express();

app.use(express.static('./WebContent'));

http.createServer(app)
.listen(process.env.PORT || 4040, function() {
	console.log('Servidor iniciado');
});

 

//var server = app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
//  var addr = server.address();
//  logger.info("Servidor iniciado em", addr.address + ":" + addr.port);
//});