/*
packages needed
	npm install express --save
	npm install lokijs --save
	npm install uuid --save
	npm install forever -g

*/
//IMPORTS
var http = require('http');
var fs = require('fs');
var express = require('express');
var loki = require('lokijs');
const { v4: uuidv4 } = require('uuid');

//CONFIGURATION
var IS_LOCAL = true;
var SERVER_PORT = 8088;

//global vars
// mapping de routes express
var app = express();
var rootPath = 'horoscope';
var API_PATH = 'horoscope/api';

var horoscopeFolderPath = "/projects/horoscope/data/";
if (IS_LOCAL){
	horoscopeFolderPath = "D:/projects/js-tools/horoscope/data/";
}

//var staticHttp200Header = {"Content-Type": "text/html; charset=utf-8","Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"};
var staticHttp200Header = {"Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"};
var staticJson200Header = {"Content-Type": "application/json; charset=utf-8","Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"};
var signs = ["aries","taurus","gemini","cancer","leo","virgo","libra","scorpius","sagittarius","capricorn","aquarius","pisces"];
var horoscopeStatus = {};
var date = "20160908";
//database link
var database;
var quizzOrderings = [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];

//SERVEUR D'APPLICATION REST
/**
 Cas de l'horoscope par date
*/
app.get(
	'/'+API_PATH+'/date/:date',
	function(req,res){
		fs.readFile(
			horoscopeFolderPath+"json."+req.params.date+".txt",
			function(error, data) {
				if (error){
					//throw error;
					res.writeHead(500, {"Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"});
					res.end("unavailable");
				}
				res.writeHead(200, {"Content-Type": "application/javascript; charset=utf-8","Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"});
				res.end(data);
			}
		);
	}
);


/**
 creation d'un quizz
*/
app.post(
	'/'+API_PATH+'/date/:date/sign/:sign/quizz/',
	function(req,res){
		console.log("post quizz: IN date="+req.params.date+" sign="+req.params.sign);
		var response = {"result":"KO"};
		fs.readFile(
			horoscopeFolderPath+"json."+req.params.date+".txt",
			function(error, data) {
				if (error){
					response.result = "OK";
					response.horoscope = false;
				}else{
					var quizzSigns = [req.params.sign];
					for (var i=0;i<2;i++){
						var newSign = signs[randomInt(0,signs.length-1)];
						while (quizzSigns.indexOf(newSign) != -1){
							newSign = signs[randomInt(0,signs.length-1)];
						}
						quizzSigns.push(newSign);
					}
					// gestion de l'ordre
					var orderedQuizzSigns = [];
					var randomOrderingIndex = randomInt(0,5);
					for (var i=0;i<quizzOrderings[randomOrderingIndex].length;i++){
						orderedQuizzSigns.push(quizzSigns[quizzOrderings[randomOrderingIndex][i]]);
					}
					var quizzId = uuidv4();
					response.quizzId = quizzId;
					//creation du quizz
					var quizz = {"date": req.params.date, "sign": req.params.sign, "signs": orderedQuizzSigns, "guess": "none", "quizzId": quizzId};
					// sauvegarde du quizz
					var quizzCollection = database.addCollection("quizz");
					var insertedQuizz = quizzCollection.insert(quizz);
					response.result = "OK";
					response.horoscope = true;
				}
				res.writeHead(200, staticJson200Header);
				res.end(JSON.stringify(response));
			}
		);
	}
);

app.get(
	'/'+API_PATH+'/date/:date/stats/',
	function(req,res){
		console.log("GET stats IN: date="+req.params.date);
		var date = req.params.date;
		var quizzCollection = database.addCollection("quizz");
		// quizzes de la journée
		var dateQuizzes = quizzCollection.find({"date": date });
		var dateQuizzesCount = dateQuizzes.length;
		// quizzes répondus
		var guessedDateQuizzesCount = quizzCollection.find({"$and": [
			{"date": date },
			{"guess" : { "$ne": "none" }}
		]}).length;
		// quizzes réussis
		var okQuizzesCount = 0;
		for (var i=0;i<dateQuizzes.length;i++){
			if (dateQuizzes[i].guess == dateQuizzes[i].sign){
				okQuizzesCount++;
			}
		}
		//console.log("stats dateQuizzesCount="+dateQuizzesCount+" guessedDateQuizzesCount="+guessedDateQuizzesCount+" okQuizzesCount="+okQuizzesCount);
		var result = {"code": "OK", "message": "none", "total": dateQuizzesCount, "tries": guessedDateQuizzesCount, "right": okQuizzesCount};
		res.writeHead(200, staticJson200Header);
		res.end(JSON.stringify(result));

	}
);

app.get(
	'/'+API_PATH+'/date/:date/sign/:sign/quizz/:quizzId',
	function(req,res){
		console.log("GET quizz IN: quizzId="+req.params.quizzId);
		var quizzId = req.params.quizzId;
		var date = req.params.date;
		var result = {code: "KO", message: "none", predictions: []};
		var quizzCollection = database.addCollection("quizz");
		var quizz = quizzCollection.findOne({quizzId: quizzId});
		if (!quizz || !quizz.guess){
			result.message = "database error, quizz "+quizzId+" not found";
			res.writeHead(200, staticJson200Header);
			res.end(JSON.stringify(result));
		}else{
			console.log("GET quizz: quizz.guess="+quizz.guess);
			// quizz bien recupere
			if (quizz.guess == "none"){
				getHoroscopes(
					date,
					null,
					function(error,horoscopes,context){
						//TODO controle de l'existence de l'horoscope pour la date
						for (var i=0;i<quizz.signs.length;i++){
							result.predictions[i] = horoscopes[quizz.signs[i]];
						}
						result.code = "OK";
						res.writeHead(200, staticJson200Header);
						res.end(JSON.stringify(result));
					}	
				);
			}else{
				result.message = "quizz already tested";
				result.code = "DONE";
				res.writeHead(200, staticJson200Header);
				res.end(JSON.stringify(result));
				console.log("GET quizz: already guessed!");
			}
		}				
	}		
);

/* gestion de la reponse au quizz*/
app.get(
	'/'+API_PATH+'/date/:date/sign/:sign/quizz/:quizzId/guess/:guess',
	function(req,res){
		var quizzId = req.params.quizzId;
		var guess = parseInt(req.params.guess);
		console.log("GET guess IN: quizzId="+quizzId+" guess="+guess);
		var result = {code: "KO", message: "none"};
		var quizzCollection = database.addCollection("quizz");
		var quizz = quizzCollection.findOne({quizzId: quizzId});
		if (quizz.guess == "none"){
			result.code = "OK";
			result.message = "fine";
			result.details = [];
			for (var i=0;i<quizz.signs.length;i++){
				result.details[i] = quizz.signs[i];	
			}
			result.guessed = (quizz.sign == quizz.signs[guess]);
			// maj du quizz
			quizz.guess = quizz.signs[guess];
			quizzCollection.update(quizz);
		}else{
			result.code = "DONE";
			result.message = "flow error: quizz "+quizzId+" already guessed";
		}
		res.writeHead(200, staticJson200Header);
		res.end(JSON.stringify(result));

	}
);

//http://localhost:8088/horoscope/signs
app.get(
	'/'+API_PATH+'/signs/',
	function(req,res){
		var currentDate = (new Date()).toISOString().slice(0,10).replace(/-/g,"");
		if (IS_LOCAL){
			currentDate = date;
		}
		fs.readFile(
			horoscopeFolderPath+"json."+currentDate+".txt",
			function(error, data) {
				var horoscope = true;
				if (error){
					horoscope = false;
				}
				var signsResponse = {"date": date, "horoscope": horoscope, "signs": signs};
				//res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8","Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"});
				res.writeHead(200, staticJson200Header);
				res.end(JSON.stringify(signsResponse));
			}
		);
	}
);

// http://localhost:8088/horoscope/date/20160908/sign/aries
app.get(
	'/'+API_PATH+'/date/:date/sign/:sign',
	function(req,res){
		fs.readFile(
			horoscopeFolderPath+"json."+req.params.date+".txt",
			function(error, data) {
				if (error){
					//throw error;
					res.writeHead(500, {"Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"});
					res.end("unavailable");
				}
				var horoscope = JSON.parse(data);
				if (horoscope[req.params.sign]){
					res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8","Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"});
					res.end(horoscope[req.params.sign]);
				}else{
					res.writeHead(403, {"Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"});
					res.end("forbidden");
				}
			}
		);
	}
);

function getHoroscope(date, sign, context, callback){
	console.log("getHoroscope: IN date="+date+" sign="+sign);
	if (horoscopeStatus[date]){
		//console.log("getHoroscope: horoscope date in cache");
		return "cached";
	}else{
		//console.log("getHoroscope: horoscope date not in cache");
		fs.readFile(
			horoscopeFolderPath+"json."+date+".txt",
			function(error, data) {
				//console.log("getHoroscope: opening file");
				if (error){
					//console.log("getHoroscope: error opening file");
					callback(true, "reading file error", context);
				}else{
					var horoscope = JSON.parse(data);
					//console.log("getHoroscope: horoscope="+horoscope);
					if (horoscope[sign]){
						callback(false, horoscope[sign], context);
						//console.log("getHoroscope: horoscope OK = "+horoscope[sign]);
						//console.log("getHoroscope: horoscope OK="+JSON.stringify(horoscope));
						//return horoscope[sign];
					}else{
						console.log("getHoroscope: horoscope KO");
						callback(true, "no such sign in horoscope", context);
					}
				}
			}
		);
	}
}

/**info: la callback est de la forme (thereIsAProblem,horoscope[],context) */
function getHoroscopes(date, context, callback){
	console.log("getHoroscopes: IN date="+date);
	//console.log("getHoroscope: horoscope date not in cache");
	fs.readFile(
		horoscopeFolderPath+"json."+date+".txt",
		function(error, data) {
			//console.log("getHoroscope: opening file");
			if (error){
				//console.log("getHoroscopes: error opening file");
				callback(true, "reading file error", context);
			}else{
				var horoscopes = JSON.parse(data);
				//console.log("getHoroscopes: horoscopes="+horoscopes);
				callback(false, horoscopes, context);
			}
		}
	);
}

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}



if (IS_LOCAL){

	// SERVEUR HTTP
	// service de la page principale
	app.get(
		'/'+rootPath,
		function(req,res){
			// console.log("web file in file:"+req.params.file);
			fs.readFile(
				'./web/horoscope.html',
				function(error, data) {
					if (error){
						//console.log("web file error");
						res.writeHead(403, {"Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"});
						res.end();
					}else{
						//console.log("web file ok");
						res.writeHead(200, staticHttp200Header);
						res.end(data);
					}
				}
			);
		}
	);

	// service des pages statiques
	app.get(
		'/'+rootPath+'/web/:file',
		function(req,res){
			// console.log("web file in file:"+req.params.file);
			fs.readFile(
				'./web/'+req.params.file,
				function(error, data) {
					if (error){
						//console.log("web file error");
						res.writeHead(403, {"Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"});
						res.end();
					}else{
						//console.log("web file ok: "+req.params.file);
						res.writeHead(200, staticHttp200Header);
						res.end(data);
					}
				}
			);
		}
	);

	// service des lib
	app.get(
		'/'+rootPath+'/web/lib/:file',
		function(req,res){
			// console.log("web file in file:"+req.params.file);
			fs.readFile(
				'./web/lib/'+req.params.file,
				function(error, data) {
					if (error){
						console.log("web lib file error");
						res.writeHead(403, {"Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"});
						res.end();
					}else{
						//console.log("web lib file ok: "+req.params.file);
						res.writeHead(200, staticHttp200Header);
						res.end(data);
					}
				}
			);
		}
	);
}


//INIT
//database and server startup
console.log("starting loki database");
database = new loki(
    'horoscope-lokidb.json',
    {
        autosave: "true",
        autosaveInterval: 2000,
    }
);

database.loadDatabase(
    {},
    function(err){
		console.log("#init loki database loaded, checking intialization");
		var horoscopeStats = database.addCollection("stats");
		console.log("#init horoscope database loaded, stats="+horoscopeStats.count());
		database.saveDatabase();
		console.log("#init launching 'horoquizz' server");
		var server=http.createServer(app);
		server.listen(SERVER_PORT,"0.0.0.0");
		console.log("#init server running on port "+SERVER_PORT);
    }
);
