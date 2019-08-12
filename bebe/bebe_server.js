var http = require('http');
var fs = require('fs');
var moment = require('moment');
var loki = require('lokijs');
var crypto = require('crypto');

//global vars
//database link
var database;

// chargement du fichier HTML affiche au client
var server = http.createServer(function(req, res) {
    fs.readFile('./bebe_client.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// socket.io conf
//NOTE local 
var io = require('socket.io')(server);
//NOTE lpr01 var io = require('socket.io')(server,{path: '/cyberscribe/socket.io'});
// connection management by logging
io.on('connection', function (socket) {
	console.log('socket#connection new client connected');
	socket.emit('connection-status', { content: 'Vous etes bien connecte !', importance: '1', status: 'OK' });

	/** demande des activites d'une journee
	* IN
	* 	day: format 20190811
	* OUT: callback
	*	status: OK ou KO
	*	activities: cf. README.txt>contrat d'interface
	*	TODO: le reste
	*/
	socket.on('log-get', function(day, clientSideCallback){
		console.log("socket#log-get day="+day);
		//TODO: controle du format des donnees
		//TODO: recuperation des activites du jour en BDD
		//TODO: fourniture des infos
		activities = [];
		clientSideCallback("OK", activities);
	});
 
	/** ajout d'une activite
	* IN
	* 	day: format 20190811
	*	type: cf. README.txt>activites supportees
	* OUT: callback
	*	status: OK ou KO
	*/
	socket.on('activity-put', function(day, type, start, clientSideCallback){
		console.log("socket#activity-put day="+day);
		//TODO: controle du format des donnees
		//TODO: insertion BDD
		//TODO: entree des donnees de l'activite
		clientSideCallback("OK");
	});

});

//database and server startup
console.log("starting loki database");
database = new loki(
    'bebe-lokidb.json',
    {
        autosave: "true",
        autosaveInterval: 2000,
    }
);

database.loadDatabase(
    {},
    function(err){
		console.log("#init loki database loaded, checking intialization");
		var logs = database.addCollection("log");
		if (logs.count() < 1){
			//TODO elements de test de base
			console.log("#init no log, creating the default admin user");
			logs.insert("");
			logs.insert("");
		}else{
			console.log("#init users database loaded");
		}
		database.saveDatabase();
		console.log("#init launching 'bebe' server");
		var serverPort = 6080;
		server.listen(serverPort);
		console.log("#init server running on port "+serverPort);
    }
);
//BUSINESS CODE

