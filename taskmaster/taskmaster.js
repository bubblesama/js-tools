//dependances
var fs = require("fs");
var http = require('http');
var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var Handlebars = require('handlebars');
var BodyParser = require('body-parser');

//init BDD
var dbFile = "tasks.db";
var dbFileExists = fs.existsSync(dbFile);

console.log("open dbFile="+dbFile);


var db = new sqlite3.Database(dbFile);

//init eventuel de la base
db.serialize(function() {
  if(!dbFileExists) {
    db.run("CREATE TABLE tasks (name TEXT)");
  }
});
db.close();


console.log("init db OK");

//mapping express
var app = express();


app.get(
	'/',
	writeTasksAndForm
);


//body-parser for POST
var urlEncodedParser = BodyParser.urlencoded({extended: false});
app.post(
	'/',
	urlEncodedParser,
	function (req, res) {
		console.log("POST IN: req.body.name="+req.body.name);
		//TODO insert BDD
		db = new sqlite3.Database(dbFile);
		db.run(
			"INSERT INTO tasks VALUES ("+req.body.name+")",
			[],
			function(error){
				db.close();
				console.log("POST INSERT done");
				writeTasksAndForm(req,res);
				if (error == null){
				}
			}
		);

	}
);

function writeTasksAndForm(req,res){
	res.writeHead(200, {"Content-Type": "text/html; charset=utf-8","Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"});
	fs.readFile('template.hbs', 'utf8', function(error, fileContent) {
		if (error){
			res.end("fs error");
		}else{
			//recuperation des infos BDD
			var allTasksResult = {"tasks":[]};
			db = new sqlite3.Database(dbFile);
			db.all(	"SELECT name FROM tasks", 
					function(err, rows) {
						console.log("writeTasksAndForm some rows! rows="+rows);
						rows.forEach(function(row) {
							console.log("writeTasksAndForm one row");
							allTasksResult.tasks.add({"name":raw.name});
						});
						var template = Handlebars.compile(fileContent);
						var data = {"content":"Je suis Contenu le contenu"};
						db.close();
						res.end(""+template(data));
					}
			);
		}
	});
};




//lancement du serveur
var server=http.createServer(app);
server.listen(8088,"0.0.0.0");

//COUCHE BDD
