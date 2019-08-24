var http = require('http');
var fs = require('fs');
var moment = require('moment');
var loki = require('lokijs');


const DATE_FORMAT = "YYYYMMDD";

//global vars
//database link
var database;




// chargement du fichier HTML affiche au client
var server = http.createServer(function(req, res) {
    fs.readFile('./bebe_client.html', 'utf-8', function(error, content) {
		if (error){
			console.log("bebe#request error while reading file");
		}else{
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(content);
		}
    });
});

// socket.io conf
var io = require('socket.io')(server);
// connection management by logging
io.on('connection', function (socket) {
	console.log('socket#connection new client connected');
	socket.emit('connection-status', { content: 'Vous etes bien connecte !', importance: '1', status: 'OK' });

	/** demande des activites d'une journee
	* IN
	* 	day: format 20190811
	* OUT: callback
	*	status: OK ou KO
	* 	log
	*		date
	*		activities: cf. README.txt>contrat d'interface
	*	TODO: le reste
	*/
	socket.on('log-get', function(date, clientSideCallback){
		console.log("socket#log-get IN date="+date);
		if (date == '?'){
			date = moment().format(DATE_FORMAT);
		}
		//TODO: controle du format des donnees
		//TODO: recuperation des activites du jour en BDD
		//TODO: fourniture des infos
		var babyLogs = database.addCollection("log");
		var dailyLog = babyLogs.findOne({date: date});
		var activities = [];
		if (dailyLog != null){
			activities = dailyLog.activities;
		}
		clientSideCallback("OK", date, activities);
	});
 
	/** ajout d'une activite
	* IN
	* 	day: format 20190811
	*	type: cf. README.txt>activites supportees
	* OUT: callback
	*	status: OK ou KO
	*/
	socket.on('activity-put', function(date, type, start, clientSideCallback){
		console.log("socket#activity-put date="+date+" type="+type+" start="+start);
		//TODO: controle du format des donnees
		if (date == '?'){
			date = moment().format(DATE_FORMAT);
		}
		if (start == '?'){
			start = moment().format("HH:mm");
		}
		console.log("socket#activity-put filled date="+date+" type="+type+" filled start="+start);
		//insertion BDD
		var babyLogs = database.addCollection("log");
		var dailyLog = babyLogs.findOne({date: date});
		if (dailyLog == null){
			babyLogs.insert({date:date, activities:[{type: type, start: start, infos: ""}]});
		}else{
			dailyLog.activities.push({type: type, start: start, infos: ""});
			babyLogs.update(dailyLog);
		}
		//TODO: entree des donnees de l'activite
		clientSideCallback("OK");
	});

	socket.on('date-next', function(date,clientSideCallback){
		refreshDate(date,"next",clientSideCallback);
	});

	socket.on('date-previous', function(date,clientSideCallback){
		refreshDate(date,"previous",clientSideCallback);
	});

	socket.on('date-now', function(date,clientSideCallback){
		clientSideCallback(moment().format(DATE_FORMAT));
	});


});


function refreshDate(date, change, clientSideCallback){
	if (date == '?'){
		date = moment().format(DATE_FORMAT);
	}
	var tmp = moment(date,DATE_FORMAT);
	var newDate = ((change == "next")?tmp.add(1,'days'):tmp.subtract(1,'days')).format(DATE_FORMAT);
	clientSideCallback(newDate);
}



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
		var babyLogs = database.addCollection("log");
		if (babyLogs.count() < 1){
			//TODO elements de test de base
			console.log("#init no babylog, creating the default admin user");
			babyLogs.insert({date:"20190812", activities:[{type: "boire", start: "07:56", infos: "gauche"}]});

		}else{
			console.log("#init babylogs database loaded, logs="+babyLogs.count());
		}
		database.saveDatabase();
		console.log("#init launching 'bebe' server");
		var serverPort = 4080;
		server.listen(serverPort);
		console.log("#init server running on port "+serverPort);
    }
);

