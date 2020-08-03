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
	db.run("CREATE TABLE meals (date TEXT, time TEXT, cook TEXT, eaters TEXT, food TEXT)");
  }
});
db.close();

console.log("#init db OK");

//mapping express
var app = express();
app.use('/static', express.static(__dirname + '/static'));
//body-parser for POST
var urlEncodedParser = BodyParser.urlencoded({zextended: false});


//TASKMASTER
// url mapping
app.get(
	'/',
	function(req,res) {
		writeTasksAndForm(req,res);
	}
);
app.get(
	'/task/:taskId/',
	function(req,res) {
		writeSingleTask(req,res);
	}
);
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
app.post(
	'/task/:taskId/',
	urlEncodedParser,
	function (req, res) {
		var taskId = req.params.taskId;
		console.log("#post /task/ POST IN: req.body.taskId="+taskId);
		var newName = req.body.task_name;
		var updateStatement = "UPDATE tasks SET name=\""+newName+"\" WHERE rowid="+taskId;
		console.log("updateStatement: "+updateStatement);
		db = new sqlite3.Database(dbFile);
		db.run(
			updateStatement,
			[],
			function(error){
				db.close();
				writeSingleTask(req,res, true);
				if (error == null){
				}else{
					console.log("ERREUR d'UPDATE: "+error);
				}
			}
		);	
	}
);

//business
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
						var data = {tasks:allTasksResult.tasks};
						db.close();
						res.end(""+template(data));
					}
			);
		}
	});
};
function writeSingleTask(httpRequest, httpResponse, isTaskModified){
	var taskId = httpRequest.params.taskId;
	console.log("#writeSingleTask IN taskId="+taskId+" isTaskModified="+isTaskModified);
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
					var data = {content:"no content", "name":row.name, "id": taskId, "modified":isTaskModified};
					db.close();
					httpResponse.end(""+template(data));
				}
			);
		}
	});
};


//MEALS
// url mapping
app.get(
	'/meals',
	function(req,res) {
		writeMealsMain(req,res);
	}
);
app.get(
	'/meals/dump',
	function(req,res) {
		writeMealsDump(req,res);
	}
);
app.get(
	'/meal/:mealId/',
	function(req,res) {
		writeSingleMeal(req,res);
	}
);
app.post(
	'/meals',
	urlEncodedParser,
	function (req, res) {
		console.log("#post /meals POST IN: req.body.date="+req.body.date);
		//insert BDD
		db = new sqlite3.Database(dbFile);
		var insertStatement = "INSERT INTO meals VALUES (\""+req.body.date+"\",\""+req.body.time+"\",\""+req.body.cook+"\",\""+req.body.eaters+"\",\""+req.body.food+"\")";
		console.log("insertStatement: "+insertStatement);
		db.run(
			insertStatement,
			[],
			function(error){
				db.close();
				writeMealsMain(req,res);
				if (error == null){
				}else{
					console.log("ERREUR d'INSERT: "+error);
				}
			}
		);

	}
);

//business
function writeMealsMain(req,res){
	console.log("#writeMealsMain IN");
	res.writeHead(200, HTTP_HEADER);
	fs.readFile('meals.hbs', 'utf8', function(error, fileContent) {
		if (error){
			res.end("#writeMealsMain fs error");
		}else{
			//recuperation des infos BDD
			var lastMealsResult = {"meals":[]};
			db = new sqlite3.Database(dbFile);
			db.all(	"SELECT rowid, date, time, cook, eaters, food FROM meals ORDER BY date DESC LIMIT 20", 
					function(err, rows) {
						rows.forEach(function(row) {
							lastMealsResult.meals.push({"id": row.rowid, "date":row.date,  "time":row.time,"cook":row.cook,"eaters":row.eaters,"food":row.food});
						});
						var template = Handlebars.compile(fileContent);
						var data = {lastMeals:lastMealsResult.meals};
						db.close();
						res.end(""+template(data));
					}
			);
		}
	});
};
function writeSingleMeal(httpRequest, httpResponse, isMealModified){
	var mealId = httpRequest.params.mealId;
	console.log("#writeSingleMeal IN mealId="+mealId+" isMealModified="+isMealModified);
	httpResponse.writeHead(200, HTTP_HEADER);
	fs.readFile('meal.hbs', 'utf8', function(error, fileContent) {
		if (error){
			res.end("fs error");
		}else{
			//recuperation des infos BDD
			var singleMealResult = {};
			db = new sqlite3.Database(dbFile);
			db.get(	
				"SELECT rowid, date, time, cook, eaters, food FROM meals WHERE rowid="+mealId, 
				function(err, row) {
					var template = Handlebars.compile(fileContent);
					var data = {
						content:"no content", 
						id: row.rowid, 
						date:row.date,  
						time:row.time,
						cook:row.cook,
						eaters:row.eaters,
						food:row.food, 
						modified:isMealModified
					};
					db.close();
					httpResponse.end(""+template(data));
				}
			);
		}
	});
};
function writeMealsDump(req,res){
	console.log("#writeMealsDump IN");
	res.writeHead(200, HTTP_HEADER);
	fs.readFile('meals-dump.hbs', 'utf8', function(error, fileContent) {
		if (error){
			res.end("#writeMealsDump fs error");
		}else{
			var template = Handlebars.compile(fileContent);
			var data = {};
			res.end(""+template(data));
		}
	});
};

//lancement du serveur
var server=http.createServer(app);
var port = 8088;
server.listen(port,"0.0.0.0");
console.log("#init server listening on port "+port);
//COUCHE BDD


