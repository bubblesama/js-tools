// miettes service 

var http = require('http');
var express = require('express');

// variables globales
var rootPath = 'miettes';

// mapping de routes express
var app = express();


app.get(
	'/'+rootPath+'/',
	function(req,res){
		res.writeHead(200, {"Content-Type": "application/javascript; charset=utf-8","Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"});
		res.end("access to miettes validated");
	}
);

// creation du serveur
var server=http.createServer(app);

// lancement serveur
server.listen(8090,"0.0.0.0");