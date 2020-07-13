//dependances
var fs = require("fs");
var http = require('http');
var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var Handlebars = require('handlebars');
var BodyParser = require('body-parser');

//STATIC
var HTTP_HEADER = {"Content-Type": "text/html; charset=utf-8","Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"};

//init BDD
var dbFile = "tasks.db";
var dbFileExists = fs.existsSync(dbFile);


var db = new sqlite3.Database(dbFile);

//init eventuel de la base
db.serialize(function() {
  if(!dbFileExists) {
    db.run("CREATE TABLE tasks (name TEXT)");
  }
});
db.close();

console.log("#init db OK");

//mapping express
var app = express();

app.get(
	'/',
	writeTasksAndForm
);

app.get(
	'/task/:taskId',
	writeSingleTask
);

//body-parser for POST
var urlEncodedParser = BodyParser.urlencoded({extended: false});
app.post(
	'/',
	urlEncodedParser,
	function (req, res) {
		console.log("#post / POST IN: req.body.name="+req.body.name);
		//insert BDD
		db = new sqlite3.Database(dbFile);
		var insertStatement = "INSERT INTO tasks VALUES (\""+req.body.name+"\")";
		console.log("insertStatement: "+insertStatement);
		db.run(
			insertStatement,
			[],
			function(error){
				db.close();
				writeTasksAndForm(req,res);
				if (error == null){
				}else{
					console.log("ERREUR d'INSERT: "+error);
				}
			}
		);

	}
);

function writeTasksAndForm(req,res){
	console.log("#writeTasksAndForm IN");
	res.writeHead(200, HTTP_HEADER);
	fs.readFile('main.hbs', 'utf8', function(error, fileContent) {
		if (error){
			res.end("fs error");
		}else{
			//recuperation des infos BDD
			var allTasksResult = {"tasks":[]};
			db = new sqlite3.Database(dbFile);
			db.all(	"SELECT rowid, name FROM tasks", 
					function(err, rows) {
						rows.forEach(function(row) {
							allTasksResult.tasks.push({"name":row.name, "id": row.rowid});
						});
						var template = Handlebars.compile(fileContent);
						var data = {content:"no content",tasks:allTasksResult.tasks};
						db.close();
						res.end(""+template(data));
					}
			);
		}
	});
};

function writeSingleTask(httpRequest,httpResponse){
	var taskId = httpRequest.params.taskId;
	console.log("#writeSingleTask IN taskId="+taskId);
	httpResponse.writeHead(200, HTTP_HEADER);
	fs.readFile('single.hbs', 'utf8', function(error, fileContent) {
		if (error){
			res.end("fs error");
		}else{
			//recuperation des infos BDD
			var singleTaskResult = {};
			db = new sqlite3.Database(dbFile);
			db.get(	
				"SELECT rowid, name FROM tasks WHERE rowid="+taskId, 
				function(err, row) {
					var template = Handlebars.compile(fileContent);
					var data = {content:"no content", "name":row.name};
					db.close();
					httpResponse.end(""+template(data));
				}
			);
		}
	});
};

//lancement du serveur
var server=http.createServer(app);
server.listen(8088,"0.0.0.0");

//COUCHE BDD
