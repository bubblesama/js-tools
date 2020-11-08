//dependances
var fs = require("fs");
var http = require('http');
var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var Handlebars = require('handlebars');
var BodyParser = require('body-parser');
var moment = require('moment');

//STATIC
const HTTP_HEADER = {"Content-Type": "text/html; charset=utf-8","Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"};
const HTTP_HEADER_PLAIN = {"Content-Type": "text/plain; charset=utf-8","Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"};

//init BDD
var dbFile = "tasks.db";
var db = new sqlite3.Database(dbFile);
//init eventuel de la base
db.serialize(function() {
	db.run("CREATE TABLE IF NOT EXISTS tasks (name TEXT)");
	db.run("CREATE TABLE IF NOT EXISTS meals (date TEXT, time TEXT, cook TEXT, eaters TEXT, food TEXT)");
	db.run("CREATE TABLE IF NOT EXISTS tips (name TEXT, recipe TEXT, times TEXT)");
});
db.close();

console.log("#init db OK");

//mapping express
var app = express();
app.use('/taskmaster/static', express.static(__dirname + '/static'));
//body-parser for POST
var urlEncodedParser = BodyParser.urlencoded({zextended: false});


//constants
var POTENTIAL_COOKS = ["A","L","M","P","X"];
var POTENTIAL_EATERS = ["A","L","M","P"];
var FOOD_REGEX = /^([A-zÀ-ú]|\s)+?$/gi;

//TASKMASTER
// url mapping
app.get(
	'/taskmaster/',
	function(req,res) {
		writeTasksAndForm(req,res);
	}
);
app.get(
	'/taskmaster/task/:taskId/',
	function(req,res) {
		writeSingleTask(req,res);
	}
);
app.post(
	'/taskmaster/',
	urlEncodedParser,
	function (req, res) {
		console.log("#post / POST IN: req.body.name="+req.body.name);
		//insert BDD
		db = new sqlite3.Database(dbFile);
		var insertStatement = "INSERT INTO tasks VALUES (\""+req.body.name+"\")";
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
	'/taskmaster/task/:taskId/',
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
	'/taskmaster/meals',
	function(req,res) {
		writeMealsMain(req,res);
	}
);
app.get(
	'/taskmaster/meals/dump',
	function(req,res) {
		writeMealsDump(req,res);
	}
);
app.get(
	'/taskmaster/meals/:mealId/',
	function(req,res) {
		writeSingleMeal(req,res);
	}
);
app.get(
	'/taskmaster/meals-tips',
	function(req,res) {
		writeMealsTips(req,res);
	}
);


app.post(
	'/taskmaster/meals',
	urlEncodedParser,
	function (req, res) {
		console.log("#post /meals POST IN: req.body.date="+req.body.date);
		var isMealFormValid = isMealValid(req.body.date,req.body.time,req.body.cook,req.body.eaters,req.body.food);
		if (!isMealFormValid){
			//TODO manage invalid values
		}else{
			console.log("#post /meals values OK for insert");
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
						console.log("#post /meals ERREUR d'INSERT: "+error);
					}
				}
			);
		}
	}
);

app.post(
	'/taskmaster/meals/dump',
	urlEncodedParser,
	function (req, res) {
		var rawDump = req.body.dump.trim();
		console.log("#post /meals/dump IN rawDump="+rawDump);
		var mealLines = rawDump.replace(/\r\n/g,"\n").split("\n");
		var mealsCount = mealLines.length;
		console.log("#post /meals/dump meals count: "+mealsCount);	
		var allOk = true;
		for (var i=0;i<mealLines.length;i++){
			var mealLine = mealLines[i];
			allOk = allOk && /^202[0-9]-[0-1][0-9]-[0-3][0-9] (midi|soir) (A|L|M|P|X) (A|L|M|P|,)+? (.+?)$/.test(mealLine); 
			var rawDate = mealLine.split(" ")[0];
			var parsedDate = moment(rawDate,"YYYY-MM-DD",true);
			allOk = allOk && parsedDate.isValid();
		}
		console.log("#post /meals/dump allOk: "+allOk);
		if (allOk){
			//clean BDD et insert des données splitées
			db = new sqlite3.Database(dbFile);
			db.serialize(function() {
				db.run("BEGIN TRANSACTION");
				db.run("DELETE FROM meals");
				var insertMealStatement = db.prepare("INSERT INTO meals (date,time,cook,eaters,food) VALUES (?,?,?,?,?)");
				for (var i=0;i<mealLines.length;i++){
					var mealData = mealLines[i].split(" ");
					insertMealStatement.run([mealData[0],mealData[1],mealData[2],mealData[3],mealData.slice(4).join(' ')]);
				}
				insertMealStatement.finalize();
				db.run("COMMIT");
				db.run("VACUUM");
			});
		}
		res.writeHead(200, HTTP_HEADER);
		fs.readFile('meals-dump-ok.hbs', 'utf8', function(error, fileContent) {
			var template = Handlebars.compile(fileContent);
			res.end(""+template({}));
		});
	}
);

app.post(
	'/taskmaster/meals/:mealId/',
	urlEncodedParser,
	function (req, res) {
		var mealId = req.params.mealId;
		console.log("#post /meals/<id> POST IN: req.params.mealId="+mealId);
		var isMealFormValid = isMealValid(req.body.date,req.body.time,req.body.cook,req.body.eaters,req.body.food);
		if (!isMealFormValid){
			//TODO manage incorrect form
		}else{
			var updateStatement = "UPDATE meals SET date=\""+req.body.date+"\", time=\""+req.body.time+"\", cook=\""+req.body.cook+"\", eaters=\""+req.body.eaters+"\", food=\""+req.body.food+"\" WHERE rowid="+mealId;
			console.log("updateStatement: "+updateStatement);
			db = new sqlite3.Database(dbFile);
			db.run(
				updateStatement,
				[],
				function(error){
					db.close();
					writeSingleMeal(req,res, true);
					if (error == null){
					}else{
						console.log("ERREUR d'UPDATE: "+error);
					}
				}
			);	
		}
	}
);

app.post(
	'/taskmaster/meals-tips/',
	urlEncodedParser,
	function (req, res) {
		console.log("#post /meals-tips/ POST IN: tip's name: "+req.body.name);
		//var isTipFormValid = isMealValid(req.body.date,req.body.time,req.body.cook,req.body.eaters,req.body.food);
		var isTipFormValid = true;
		if (!isTipFormValid){
			//TODO manage invalid values
		}else{
			console.log("#post /tips values OK for insert");
			db = new sqlite3.Database(dbFile);
			var insertStatement = "INSERT INTO tips ('name', 'times', 'recipe') VALUES (\""+req.body.name+"\",\""+req.body.times+"\",\""+req.body.recipe+"\")";
			console.log("insertStatement: "+insertStatement);
			db.run(
				insertStatement,
				[],
				function(error){
					db.close();
					writeMealsTips(req,res);
					if (error == null){
					}else{
						console.log("#post /tips ERREUR d'INSERT: "+error);
					}
				}
			);
		}
	}
);

//API
app.delete(
	'/taskmaster/api/tip/:tipId',
	urlEncodedParser,
	function (req, res) {
		var tipId = req.params.tipId;
		console.log("#delete /tip/ DELETE IN: req.body.tipId="+tipId);
		res.writeHead(200, HTTP_HEADER_PLAIN);
		db = new sqlite3.Database(dbFile);
		db.run("DELETE FROM tips WHERE rowid="+tipId);
		res.end("OK!");
	}
);

//business
function isMealValid(date, time, cook, eaters, food){
	var result = true;
	//params control
	//params control: date
	var parsedDate = moment(date,"YYYY-MM-DD",true);
	if (!parsedDate.isValid()){
		console.log("#isMealValid invalid date:"+date);
		result = false;
	}
	//params control: time
	if (time != "midi" && time != "soir"){
		console.log("#isMealValid invalid time:"+time);
		result = false;
	}
	//params control: cook
	if (!POTENTIAL_COOKS.includes(cook)){
		console.log("#isMealValid invalid cook:"+cook);
		result = false;
	}
	//params control: eaters
	var eatersArray = eaters.split(',');
	for (var i=0;i<eatersArray.length;i++){
		if (!POTENTIAL_EATERS.includes(eatersArray[i])){
			console.log("#isMealValid invalid eater:"+eatersArray[i]);
			result = false;
		}
	}
	//params control: food
	if (food == null || food == "" || !food.match(FOOD_REGEX)){
		console.log("#isMealValid invalid food:"+foodRawValue);
		result = false;
	}
	return result;
};

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
			db.all(
				"SELECT rowid, date, time, cook, eaters, food FROM meals ORDER BY date DESC, time DESC", 
				function(err, rows) {
					var countTo20 = 0;
					var tickets = {
						A: {created: 0, consumed: 0},
						L: {created: 0, consumed: 0},
						M: {created: 0, consumed: 0},
						P: {created: 0, consumed: 0},
						X: {created: 0, consumed: 0}
					};
					var counts = {
						A: {created: 0, present: 0},
						L: {created: 0, present: 0},
						M: {created: 0, present: 0},
						P: {created: 0, present: 0},
						X: {created: 0, present: 0}
					};
					rows.forEach(function(row) {
						if (countTo20 < 20){
							countTo20++;
							lastMealsResult.meals.push({"id": row.rowid, "date":row.date,  "time":row.time,"cook":row.cook,"eaters":row.eaters,"food":row.food});
						}
						var splitEaters = row.eaters.split(",");
						var eatersCount = splitEaters.length;
						counts[row.cook].created++;
						if (tickets[row.cook]){
							tickets[row.cook].created += eatersCount;
						}
						for (var i=0;i<splitEaters.length;i++){
							if (row.cook != "X"){
								tickets[splitEaters[i]].consumed++;
							}
							counts[splitEaters[i]].present++;
						}
					});
					tickets.A.balance = tickets.A.created - tickets.A.consumed;
					tickets.L.balance = tickets.L.created - tickets.L.consumed;
					tickets.M.balance = tickets.M.created - tickets.M.consumed;
					tickets.P.balance = tickets.P.created - tickets.P.consumed;
					var template = Handlebars.compile(fileContent);
					var data = {lastMeals:lastMealsResult.meals,counts:counts, tickets:tickets};
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
			//recuperation des infos BDD
			var rawMealsDump = "";
			db = new sqlite3.Database(dbFile);
			db.all(	"SELECT rowid, date, time, cook, eaters, food FROM meals ORDER BY date DESC, time DESC", 
				function(err, rows) {
					rows.forEach(function(row) {
						var rawSingleMeal = row.date+" "+row.time+" "+row.cook+" "+row.eaters+" "+row.food;
						rawMealsDump+= rawSingleMeal+"\n";
					});			
					var template = Handlebars.compile(fileContent);
					var data = {rawDump:rawMealsDump};
					db.close();
					res.end(""+template(data));
				}
			);
		}
	});
};
function writeMealsTips(req,res){
	console.log("#writeMealsTips IN");
	res.writeHead(200, HTTP_HEADER);
	fs.readFile('meals-tips.hbs', 'utf8', function(error, fileContent) {
		if (error){
			res.end("#writeMealsTips fs error");
		}else{
			//recuperation des infos BDD
			var allTipsResult = {"tips":[]};
			db = new sqlite3.Database(dbFile);
			db.all(
				"SELECT rowid, name, recipe, times FROM tips", 
				function(err, rows) {
					var tips = [];
					rows.forEach(function(row) {
						tips.push({name: row.name, times: row.times, recipe: row.recipe, id: row.rowid});
					});
					var template = Handlebars.compile(fileContent);
					var data = {tips: tips};
					db.close();
					res.end(""+template(data));
				}
			);
		}
	});
};
//lancement du serveur
var server=http.createServer(app);
var port = 8100;
server.listen(port,"0.0.0.0");
console.log("#init server listening on port "+port);
//COUCHE BDD


