var http = require('http');
var fs = require('fs');
var moment = require('moment');
var loki = require('lokijs');



//global vars
//database link
var database;



// chargement du fichier HTML affiche au client
var server = http.createServer(function(req, res) {
    fs.readFile('./cyberscribe_client.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// utilisateurs
var USERS = {
	"mylogin": {"pass": "123"},
	"polo": {"pass": "secret_polo_horse_banana"}
};

// socket.io conf
//NOTE local 
var io = require('socket.io')(server);
//NOTE lpr01 var io = require('socket.io')(server,{path: '/cyberscribe/socket.io'});
// connection management by logging
io.on('connection', function (socket) {
	console.log('new client connected');
	socket.emit('connection-status', { content: 'Vous �tes bien connect� !', importance: '1', status: 'OK' });
	var currentUserLogin;
	
	// gestion de la requete de login
	socket.on('user-login', function(userLogin,userPass,clientSideCallback){
		console.log("socket#user-login userLogin="+userLogin+" userPass.length="+userPass.length);
		if (USERS[userLogin] != null &&  USERS[userLogin].pass == userPass){
			var sessionCode = USERS[userLogin].code;
			if (sessionCode == null){
				sessionCode = ""+Math.floor(Math.random()*1000000);
				USERS[userLogin].code = sessionCode;
				USERS[userLogin].timeout = moment().add(2,"hours").format();
				console.log("socket#user-login new session: userLogin="+userLogin+" timeout="+USERS[userLogin].timeout);
			}
			currentUserLogin = userLogin;
			clientSideCallback(true,"well done",sessionCode);
		}else{
			clientSideCallback(false,"authentication error");
		}
	});

	socket.on('message-write', function(login, sessionCode,clientSideCallback){
		console.log("socket#message-write sessionCode="+sessionCode);
		clientSideCallback("message received");
	});

	socket.on('disconnect',function(){
		console.log("disconnect");
		if (currentUserLogin != null && !("" == (currentUserLogin))){
			
		}
	});

});



//database and server startup

console.log("starting loki database");
database = new loki(
    'cyberscribe-lokidb.json',
    {
        autosave: "true",
        autosaveInterval: 2000,
    }
);

database.loadDatabase(
    {},
    function(err){
		console.log("loki database loaded, checking intialiszation");
		var status = database.addCollection("status");
        status.insert({status: "on"});
		database.saveDatabase();
		console.log("launching chat server");
		var serverPort = 4040;
		server.listen(serverPort);
		console.log("server running on port "+serverPort);
    }
);



//BUSINESS CODE

