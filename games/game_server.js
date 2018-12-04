var http = require('http');
var fs = require('fs');
// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./game_client.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});
// Chargement de socket.io
var io = require('socket.io').listen(server);
// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
	socket.emit('message', { content: 'Vous êtes bien connecté !', importance: '1' });
	socket.emit('game', game);
	
});

var game = {
	'id': 18,
	'players':  {
		'player1': {
			'state': 'playing'
		},
		'player2': {
			'state': 'waiting'
		}
	},
	'turn': 1,
	'activePlayer': 'player1',
	'board': {
		'toto': 'tutu'
	}
};

var actions = {
	logGameId: function(){
		console.log("logGameId: gameId="+game.id);
	}
};


actions.logGameId();

server.listen(4040);