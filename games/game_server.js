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
		if (USERS[userLogin] != null &&  USERS[userLogin].pass == userPass){
			var sessionCode = USERS[userLogin].code;
			if (sessionCode == null){
				sessionCode = ""+Math.floor(Math.random()*1000000);
				 USERS[userLogin].code = sessionCode;
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
		//creating a simple list of games
		// commmon parameters for all types of games: name, id, type
		var gameList = [];
		for (var gameName in SERVER_GAMES){
			gameList.push({
				"name": gameName, 
				"id": SERVER_GAMES[gameName].getGameId(), 
				"type":  SERVER_GAMES[gameName].getGameType(), 
				"players": {
					"count":SERVER_GAMES[gameName].getPlayersCount(),
					"max": SERVER_GAMES[gameName].getPlayersMax()
					}
			});
		}
		clientSideCallback(true,"mock response",gameList);
	});
	
	//joining a game
	socket.on('games-join', function(gameName, userLogin, userSessionCode, clientSideCallback){
		console.log("socket#games-join IN gameName="+gameName+" userLogin="+userLogin);
		var success = false;
		var message = "games-join error while joining game";
		// session user control method
		if (USERS[userLogin] == null || USERS[userLogin].code != userSessionCode){
			message = "games-join authentication error!";
		}else{
			//get game and control access
			var chosenGame = SERVER_GAMES[gameName];
			if (chosenGame != null){
				//control on players count
				if (chosenGame.getPlayersCount() >= chosenGame.getPlayersMax()){
					message = "games-join too many players on "+gameName;
				}else{
					//TODO add player to game
					var tryJoiningResult = chosenGame.addPlayer(userLogin);
					if (!tryJoiningResult.success){
						success = false;
						message = tryJoiningResult.message;
					}else{
						success = true;
						message = "games-join OK";
					}
				}
			}else{
				// unexisting game
				message = "games-join game "+gameName+" not found!";
			}
		}
		clientSideCallback(success,message);
	});
	
	//joining a game
	socket.on('game-status', function(gameName, userLogin, userSessionCode, clientSideCallback){
		console.log("socket#game-status IN gameName="+gameName+" userLogin="+userLogin);
		var success = false;
		var message = "games-status error while getting game status";
		var gameStatus = {};
		// session user control method
		if (USERS[userLogin] == null || USERS[userLogin].code != userSessionCode){
			message = "games-status authentication error!";
		}else{
			success = true;
			message = "games-status OK";
			gameStatus = SERVER_GAMES[gameName];
		}
		clientSideCallback(success,message,gameStatus);
	});
	
	

});

//--------------- PARTIE METIER GESTION DES JOUEURS
var USERS = {
	"mylogin": {"pass": "123"},
	"polo": {"pass": "secret_polo_horse_banana"}
};


//--------------- PARTIE METIER JEU DES PETITS CHEVAUX
var firstHorseGame = {
	//base functions for generic games infos
	getGameId: function(){
		return this.game_id;
	},
	getGameType: function(){
		return this.game_type;
	},
	getPlayersCount: function(){
		return helpers.getPlayersCount(this);
	},
	getPlayersMax: function(){
		return this.game_max_players;
	},
	addPlayer: function (playerName){
		var result = {success: false, message: "addPlayer KO"};
		var currentPlayerCount = this.getPlayersCount();
		//TODO controlling duplicate for users
		this.players["player"+(currentPlayerCount+1)] = {login: playerName};
		actions.resetGame(this);
		result.success = true;
		result.message = "addPlayer OK";
		return result;
	},
	'game_id': 18,
	'game_type': "horses",
	'game_max_players': 4,
	'players':  {
		'player1': {login: "toto"},
		'player2': {login: "tutu"}
	},
	'turn': 1,
	'activePlayer': 'player1',
	'board': {
		'dice': {
			'value': 6,
			'rolledThisTurn': false,
			'usedThisTurn': false
		}
		
	},
	actions: ["resetGame", "launchDice", "moveHorse", "endTurn"]
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
		game.turn = 1;
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
		console.log("logGameId firstHorseGameId="+firstHorseGame.id);
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
				result.comment = "too few players:"+playersCount+" instead of 2 min";
			}else{
				result.comment = "too many players:"+playersCount+" instead of 4 max";
			}
		}
		return result;
	},
	// contrôle du lancer de dé
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
	// contrôle du mouvement d'un cheval
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
//	actions['resetGame'](firstHorseGame);
//	actions.launchDice(firstHorseGame)("player1");
//	actions.moveHorse(firstHorseGame)("player1")(2);
//	console.log("TEST player1.horse(2).step="+helpers.getHorse(firstHorseGame)('player1')(2).step);
//}

//--------------- FIN PARTIE METIER JEU DES PETITS CHEVAUX




//--------------- GESTIONNAIRE GLOBAL DES PARTIES
var SERVER_GAMES = {"horses_18":firstHorseGame};

//var method = "doSomething";
//var controlMethod = "can"+method.substring(0,1).toUpperCase()+method.substring(1);
//console.log("TEST: method="+method+" controlMethod="+controlMethod);
var serverPort = 4040;
console.log("lancement serveur");
server.listen(serverPort);
console.log("serveur en route sur le port "+serverPort);