var http = require('http');
var fs = require('fs');
var express = require('express');
var ent = require('ent');
var Mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

// mapping de routes express
var app = express();

var rootPath = 'horoscope';
var apiPath = 'horoscope/api';
//NOTE 
//var horoscopeFolderPath = "/projects/horoscope/data/";
var horoscopeFolderPath = "D:/projects/js-tools/horoscope/data/";
var staticHttp200Header = {"Content-Type": "text/html; charset=utf-8","Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"};
var signs = ["aries","taurus","gemini","cancer","leo","virgo","libra","scorpius","sagittarius","capricorn","aquarius","pisces"];

var horoscopeStatus = {};


var date = "20160908";
var serverAddress = "192.168.1.16:27017";
var dbName = "horoscope";
var dbUrl = "mongodb://"+serverAddress+"/"+dbName

var quizzOrderings = [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];

//SERVEUR D'APPLICATION REST
/**
 Cas de l'horoscope par date
*/
app.get(
	'/'+apiPath+'/date/:date',
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
	'/'+apiPath+'/date/:date/sign/:sign/quizz/',
	function(req,res){
		console.log("post quizz: IN date="+req.params.date+" sign="+req.params.sign);
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
		var response = {"result":"KO", "quizzId":"-1"};
		//creation du quizz
		var quizz = {"date": req.params.date, "sign": req.params.sign, "signs": orderedQuizzSigns, "guess": "none"};
		// sauvegarde du quizz
		MongoClient.connect(dbUrl, function(err, db) {
			var collection = db.collection('quizz');
			// insert some documents
			collection.insert(
				quizz,
				function(err, result) {
					if (err){
					}else{
						console.log("post quizz: "+result);
						response.result = "OK";
						response.quizzId = result.insertedIds[0];
					}
					res.writeHead(200, staticHttp200Header);
					res.end(JSON.stringify(response));
				}
			);
		});
	}
);

/*

 db.quizz.find({date:"20160908",$where: "this.guess == this.sign"}).count();
var query = {date: date, guess :{ $ne: "none" }};

*/


app.get(
	'/'+apiPath+'/date/:date/stats/',
	function(req,res){
		console.log("GET stats IN: date="+req.params.date);
		var date = req.params.date;
		MongoClient.connect(
			dbUrl, 
			function(err, db) {
				var collection = db.collection('quizz');
				// recuperation des stats
				var query = {date: date};
				var result = {"code": "KO", message: "none"};
				collection.count(
					query,
					function(error, count) {
						if (!error){
							result.total = count;
							query = {date: date, guess :{ $ne: "none" }};
							collection.count(
								query,
								function(error, count) {
									if (!error){
										result.tries = count;
										query = {date: date, $where: "this.guess == this.sign"};
										collection.count(
											query,
											function(error, count) {
												if (!error){
													result.right = count;
													res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8","Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"});
													res.end(JSON.stringify(result));
												}else{
													result.message = "database error on right: "+error;
													res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8","Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"});
													res.end(JSON.stringify(result));
												}
											}
										);
									}else{
										result.message = "database error on generated: "+error;
										res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8","Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"});
										res.end(JSON.stringify(result));
									}
								}
							);
						}else{
							result.message = "database error on total: "+error;
							res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8","Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"});
							res.end(JSON.stringify(result));
						}
					}
				);
			}
		);
	}
);

app.get(
	'/'+apiPath+'/date/:date/sign/:sign/quizz/:quizzId',
	function(req,res){
		console.log("GET quizz IN: quizzId="+req.params.quizzId);
		var quizzId = req.params.quizzId;
		var date = req.params.date;
		MongoClient.connect(
			dbUrl, 
			function(err, db) {
				var collection = db.collection('quizz');
				// recuperation du quizz
				var query = {"_id":new Mongo.ObjectID(quizzId)};
				collection.findOne(
					query,
					function(error, quizz) {
						var result = {"code": "KO", message: "none", predictions: []};
						if (error){
							result.message = "database error, quizz "+quizzId+" with no error known";
							res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8","Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"});
							res.end(JSON.stringify(result));
						}else{
							if (!quizz || !quizz.guess){
								result.message = "database error, quizz "+quizzId+" not found";
								res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8","Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"});
								res.end(JSON.stringify(result));
							}else{
								console.log("GET quizz: quizz.guess="+quizz.guess);
								// quizz bien recupere
								if (quizz.guess == "none"){
									getHoroscopes(
										date,
										null,
										function(error,horoscopes,context){
											
											//TODO controle de l'existance de l'horoscope pour la date
											
											for (var i=0;i<quizz.signs.length;i++){
												result.predictions[i] = horoscopes[quizz.signs[i]];
											}
											result.code = "OK";
											res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8","Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"});
											res.end(JSON.stringify(result));
										}	
									);
								}else{
									result.message = "quizz already tested";
									result.code = "DONE";
									res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8","Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"});
									res.end(JSON.stringify(result));
									console.log("GET quizz: already guessed!");
								}
							}
						}				
					}
				);
			}
		);
	}
);


/* gestion de la reponse au quizz*/
app.get(
	'/'+apiPath+'/date/:date/sign/:sign/quizz/:quizzId/guess/:guess',
	function(req,res){
		var quizzId = req.params.quizzId;
		var guess = parseInt(req.params.guess);
		console.log("GET guess IN: quizzId="+quizzId+" guess="+guess);
		var result = {code: "KO", message: "none"};
		MongoClient.connect(
			dbUrl, 
			function(err, db) {
				var collection = db.collection('quizz');
				// recuperation du quizz
				var query = {"_id":new Mongo.ObjectID(quizzId)};
				collection.findOne(
					query,
					function(error, quizz) {
						if (!error){
							if (quizz.guess == "none"){
								result.code = "OK";
								//result.message = "quizz.guess="+quizz.guess+" quizz.signs[guess]="+quizz.signs[guess] ;
								result.message = "fine";
								result.details = [];
								for (var i=0;i<quizz.signs.length;i++){
									result.details[i] = quizz.signs[i];	
								}
								result.guessed = (quizz.sign == quizz.signs[guess]);
								// maj du quizz
								collection.update(
									query, 
									{$set:{guess:quizz.signs[guess]}}, 
									{w:1}, 
									function(err, result) {
										if (error){
											result.message("database error while saving quizz state, quizz "+quizzId+" not updated with guess");
										}
									}
								);
							}else{
								result.code = "DONE";
								result.message = "flow error: quizz "+quizzId+" already guessed";
							}
						}else{
							result.message = "database error, quizz "+quizzId+" not found";
						}
						res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8","Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"});
						res.end(JSON.stringify(result));
					}
				);
			}
		);
	}
);

//http://localhost:8088/horoscope/signs
app.get(
	'/'+apiPath+'/signs/',
	function(req,res){
		//NOTE passage à la date du jour
		//var signsResponse = {"date": (new Date()).toISOString().slice(0,10).replace(/-/g,""), "signs": signs};
		var signsResponse = {"date": date, "signs": signs};
		res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8","Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"});
		res.end(JSON.stringify(signsResponse));
	}
);

// http://localhost:8088/horoscope/date/20160908/sign/aries
app.get(
	'/'+apiPath+'/date/:date/sign/:sign',
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

// creation du serveur
var server=http.createServer(app);


var serverPort = 8088;
console.log("serveur launched, listening on port "+serverPort);
// lancement serveur
server.listen(serverPort,"0.0.0.0");

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
