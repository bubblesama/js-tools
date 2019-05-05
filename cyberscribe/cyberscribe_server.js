var http = require('http');
var fs = require('fs');
var moment = require('moment');
var loki = require('lokijs');
var crypto = require('crypto');

//global vars
//database link
var database;
//socket for users
var socketsByUser = new Map();

// chargement du fichier HTML affiche au client
var server = http.createServer(function(req, res) {
    fs.readFile('./cyberscribe_client.html', 'utf-8', function(error, content) {
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
	console.log('new client connected');
	socket.emit('connection-status', { content: 'Vous etes bien connecte !', importance: '1', status: 'OK' });
	var currentUserLogin;
	
	// gestion de la requete de login
	socket.on('user-login', function(userLogin, userPass, clientSideCallback){
		console.log("socket#user-login userLogin="+userLogin+" userPass.length="+userPass.length);
		var users = database.addCollection("users");
		var dbUserLogin = users.findOne({login: userLogin});
		if (dbUserLogin != null){
			if (hash(userPass) == dbUserLogin.hash){
				console.log("socket#user-login login success for "+userLogin+"!");
				socketsByUser.set(userLogin, socket);
				clientSideCallback(true,"well done",4567);
			}else{
				console.log("socket#user-login incorrect password for "+userLogin);
				clientSideCallback(false,"authentication error");
			}
		}else{
			console.log("socket#user-login no user with login "+userLogin);
			clientSideCallback(false,"authentication error");
		}
	});

	socket.on('message-write', function(userFrom, sessionCode, content, clientSideCallback){
		console.log("socket#message-write userFrom="+userFrom+" sessionCode="+sessionCode+" content="+content);
		var message = getMessageObject(userFrom,content);
		socketsByUser.forEach(
			function(socket, userLogin){
				console.log("socket#message-write emitting on socket for \""+userLogin+"\"");
				socket.emit("message-received",message);
			}
		);
		clientSideCallback("message received");
	});
 
	socket.on('disconnect',function(){
		console.log("disconnect");
		if (currentUserLogin != null && !("" == (currentUserLogin))){
			socketsByUser.delete(currentUserLogin);
			currentUserLogin = null;
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
		console.log("#init loki database loaded, checking intialiszation");
		var status = database.addCollection("status");
		status.insert({status: "on"});
		var users = database.addCollection("users");
		if (users.count() < 1){
			console.log("#init no users, creating the default admin user");
			users.insert(getUserObject("lise","123"));
			users.insert(getUserObject("paul","123"));
		}else{
			console.log("#init users database loaded");
		}
		database.saveDatabase();
		console.log("#init launching chat server");
		var serverPort = 4040;
		server.listen(serverPort);
		console.log("#init server running on port "+serverPort);
    }
);
//BUSINESS CODE

//fonction de login: check en BDD, retour asynchrone dans _callback
// parametre de callback: TODO
function login(user, password, _callback){};

// TODO
function logout(user, _callback){};

//TODO
function message(userFrom, userTo, content, _callback){};

//USERS MANAGEMENT
function getUserObject(userLogin, userPassword){
	return {
		login: userLogin,
		hash: hash(userPassword),
		created: moment().format()
	};
};

var noSecret = "nosecret";
function hash(source){
	return crypto.createHmac('sha256', noSecret).update(source).digest('hex');
};

//MESSSAGE MANAGEMENT
function getMessageObject(userFrom, content){
	return {
		from: userFrom,
		content: content,
		timestamp: moment().format()
	};
}
