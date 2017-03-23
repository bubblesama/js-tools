//dependances
var fs = require("fs");
var http = require('http');
var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var Handlebars = require('handlebars');


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

console.log("init db OK");

db.close();








//mapping express
var app = express();

app.get(
	'/',
	function(req,res){
		res.writeHead(200, {"Content-Type": "application/javascript; charset=utf-8","Cache-Control": "no-cache, no-store, must-revalidate","Pragma": "no-cache","Expires": "0"});
		res.end("taskmaster");
	}
);




//lancement du serveur
var server=http.createServer(app);
server.listen(8088,"0.0.0.0");




var source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
             "{{kids.length}} kids:</p>" +
             "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";
var template = Handlebars.compile(source);
 
var data = { "name": "Alan", "hometown": "Somewhere, TX",
             "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
var result = template(data);
console.log(result);


//COUCHE BDD
