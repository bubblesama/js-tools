var http = require('http');
var fs = require('fs');
// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./game_client.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});
// loading socket.io
var io = require('socket.io').listen(server);
// connection management by logging
io.sockets.on('connection', function (socket) {
	console.log('new client connected');
	socket.emit('connection-status', { content: 'Vous êtes bien connecté !', importance: '1', status: 'OK' });
	//socket.emit('game', game);
	//TODO login infos et protocole
	// requete de login avec clé et nom de joueur
	// enregistrement et validation /refus d'accès
	// association à une partie
	
	
	// gestion de la requête de login
	socket.on('user-login', function(userLogin,userPass,clientSideCallback){
		console.log("socket#user-login userLogin="+userLogin+" userPass.length="+userPass.length);
		if (users[userLogin] != null &&  users[userLogin].pass == userPass){
			var sessionCode = users[userLogin].code;
			if (sessionCode == null){
				sessionCode = ""+Math.floor(Math.random()*1000000);
				 users[userLogin].code = sessionCode;
			}
			clientSideCallback(true,"well done",sessionCode);
		}else{
			clientSideCallback(false,"authentication error");
		}
	});
	
	

	socket.on('disconnect',function(){
		console.log("disconnect!");
	});
	
	//list of games
		socket.on('games-list', function(clientSideCallback){
		console.log("socket#games-list IN");
		clientSideCallback(true,"mock response");
	});
	
	
	
	
});

//--------------- PARTIE METIER GESTION DES JOUEURS
var users = {
	"mylogin": {"pass": "123"}
};


//--------------- PARTIE METIER JEU DES PETITS CHEVAUX
var game = {
	'id': 18,
	'players':  {
		'player1': {},
		'player2': {}
	},
	'turn': 1,
	'activePlayer': 'player1',
	'board': {
		'dice': {
			'value': 6,
			'rolledThisTurn': false,
			'usedThisTurn': false
		}
		
	}
};

// helpers pour accès aux données du jeu
var helpers = {
	getHorse: function(game){
		return function(playerName){
			return function(horseId){
				console.log("helpers#getHorse IN game.id="+game.id+" playerName="+playerName+" horseId="+horseId);
				//console.log("helpers#getHorse game.players[playerName].horses.length="+game.players[playerName].horses.length);
				var result = game.players[playerName].horses.filter(horse => horse.id == horseId)[0];
				console.log("helpers#getHorse result.length="+result.length);
				return result;
			}
		}
	},
	getPlayersCount: function (game){
		var playersCount = 0;
		for (var playerName in game.players){
			playersCount++;
		}
		return playersCount;
	}
	
	
};

//available game actions
//actions attendues du jeu
// - lancement du jeu
// - lancement de dé
// - mouvement d'un cheval
// - fin de tour
// 
var actions = {
	//lancement du jeu
	resetGame: function (game){
		console.log("actions#resetGame IN");
		for (var playerName in game.players){
			console.log("actions#resetGame for player: "+playerName);
			var player = game.players[playerName];
			player.horses = [];
			for (var i=0;i<4;i++){
				player.horses.push({'playerName': playerName, 'id':i, 'step': 0});
			}
		}
		//TODO fin de reset du board
		
		//test
		console.log("actions#resetGame done");
	},
	//lancement de dé
	launchDice: function (game){
		return function (playerName){
			//TODO random sur le lancer de dé
			var roll = ++game.board.dice.value;
			if (roll > 6){
				roll = 1;
			}
			console.log("actions#launchDice \""+playerName+"\" rolled a "+roll+" for game="+game.id);
			game.board.dice.value = roll;
			game.board.dice.rolledThisTurn = true;
			game.board.dice.usedThisTurn = false;
		}
	},
	//mouvement d'un cheval
	moveHorse: function (game){
		return function(playerName){
			return function(horseId){
				var horse = helpers.getHorse(game)(playerName)(horseId);
				console.log("actions#moveHorse horse: horse.playerName="+horse.playerName+" horse.id="+horse.id);
				console.log("actions#moveHorse game.board.dice.value="+game.board.dice.value);
				console.log("actions#moveHorse initial horse.step="+horse.step);
				horse.step = game.board.dice.value+horse.step;
				console.log("actions#moveHorse final horse.step="+horse.step);
				//TODO log
				//TODO consequences sur le plateau
				game.board.dice.usedThisTurn = true;
				//TODO consequence sur les autres chevaux ou la situation de fin
				
			}
		}
	},
	//fin de tour
	endTurn: function(game){
		return function(playerName){
			game.board.rolledThisTurn = false;
			game.board.usedThisTurn = false;
		}
	},
	//
	logGameId: function(){
		console.log("logGameId gameId="+game.id);
	}
};

//controls to call before actions for consistency
//format des retours: {'success':true/false, 'comment':'patati'}
var controls = {
	canResetGame: function(game){
		var playersCount = helpers.getPlayersCount(game);
		console.log("controls#canResetGame playersCount="+playersCount);
		var result = {'success': false, 'comment': "none"};
		if ((playersCount >1 && playersCount <5)){
			result.success = true;
		}else{
			result.comment = "too "+((playersCount < 2)?"few":"many")+"players: "+playersCount+" instead of 2";
			if (playersCount < 2){
				result.comment = "too few players:"+playersCount+" instead of 2";
			}else{
				result.comment = "too many players:"+playersCount+" instead of 2";
			}
		}
		return result;
	},
	//TODO contrôle du lancer de dé
	canLaunchDice: function(game){
		return function (playerName){
			var result = {'success': false, 'comment': "none"};
			if (game.activePlayer != playerName){
				result.comment = playerName+" n'est pas le joueur actif!";
			}else{
				if (game.board.dice.rolledThisTurn){
					result.comment = "le dé a déjà été jeté ce tour-ci";
				}else{
					result.success = true;
				}
			}
			return result;
		}
	},
	//TODO contrôle du mouvement d'un cheval
	canMoveHorse: function(game){
		return function (playerName){
			return function (horseId){
				var result = {'success': false, 'comment': "none"};
				//TODO check existence joueur et cheval
				//TODO check du bon joueur
				// contrôle de l'état du tour
				if (!game.dice.rolledThisTurn){
					result.comment = "le dé n'a pas été jeté";
				}else{
					if (game.dice.usedThisTurn){
						result.comment = "le mouvement a déjà été fait!";
					}else{
						result.success = true;
					}
				}
			}
		}
	}
};



//SIMPLE TEST FONCTIONNEL
//actions.logGameId();
//if (controls.canResetGame(game).success){
//	actions['resetGame'](game);
//	actions.launchDice(game)("player1");
//	actions.moveHorse(game)("player1")(2);
//	console.log("TEST player1.horse(2).step="+helpers.getHorse(game)('player1')(2).step);
//}

//--------------- FIN PARTIE METIER JEU DES PETITS CHEVAUX




//--------------- GESTIONNAIRE GLOBAL DES PARTIES
var games = {"horses_18":game};

//var method = "doSomething";
//var controlMethod = "can"+method.substring(0,1).toUpperCase()+method.substring(1);
//console.log("TEST: method="+method+" controlMethod="+controlMethod);
var serverPort = 4040;
console.log("lancement serveur");
server.listen(serverPort);
console.log("serveur en route sur le port "+serverPort);