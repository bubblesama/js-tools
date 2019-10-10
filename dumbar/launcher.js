// - INIT SERVER ---------------------------------------------------------
var express = require('express');
var hostname = 'localhost';
var port = 8000;
var app = express();
app.use(express.urlencoded());
var router = express.Router()
// init loki
var loki = require('lokijs');
var database = new loki(
    'dumbar-lokidb.json',
    {
        autosave: "true",
        autosaveInterval: 2000,
    }
);
// - /INIT SERVER --------------------------------------------------------


// - ROUTING --------------------------------------------------------------
router.route("/")
.get(function(request, response){
    _displayDefault(request,response);
});
router.route("/dumbar/persons")
.get(function(request, response){
    _listAllPersons(request,response);
}).post(function(request, response){
    _createPerson(request,response);
});
router.route("/dumbar/web/")
.get(function(request, response){
    _displayGui(request,response);
});
// - /ROUTING -------------------------------------------------------------


// - CONTROLLER -----------------------------------------------------------
var _displayDefault = function(request, response){
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end("<html><head><title>dumbar</title></head><body><h1>dumbar</h1>"+
    "<p><a href='/dumbar/persons'>all</a></p>"+
    "<p><a href='/dumbar/web/'>GUI</a></p>"+
    "</body></html>");
};
var _displayGui = function(request, response){
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end(
        "<html><head><title>dumbar</title></head>"+
        "<body><h1>dumbar - add person</h1>"+
        "<form action='/dumbar/persons' method='post'>"+
        "<p>name: <input type='text' name='name'></p>"+
        "<p><input type='submit' value='create'></p>"+
        "</form>"+
        "</body></html>"
    );
};
var _listAllPersons = function(request, response){
    response.json({message: "todo", persons: dbGetAllPersons()});
};
var _createPerson = function(request, response){
    dbCreatePerson(request.body.name);
    response.json({message: "done", name: request.body.name});
};
// - /CONTROLLER ----------------------------------------------------------


// - OBJETS ---------------------------------------------------------------
class Person {
	constructor(name){
		this.name = name;
	}
};
// - /OBJETS --------------------------------------------------------------


// - DB -------------------------------------------------------------------
var dbGetAllPersons = function(){
    var personsDbCollection = database.addCollection("person");
    var rawPersonList =  personsDbCollection.find();
    var result = [];
    //filter set parameters
    for (var i=0;i<rawPersonList.length;i++){
        result.push({name: rawPersonList[i].name});
    }
    return result;
};
var dbCreatePerson = function(name){
    var personsDbCollection = database.addCollection("person");
    personsDbCollection.insertOne({name: name});
};
// - /DB ------------------------------------------------------------------


// - LAUNCHING SERVER -----------------------------------------------------
app.use(router);
database.loadDatabase(
    {},
    function(err){
        var logDbCollection = database.addCollection("log");
        //dbCreatePerson("John");
        app.listen(port, hostname, function(){
            console.log("launching serveur on http://"+ hostname +":"+port); 
        });
    }
);
// - /LAUNCHING SERVER ----------------------------------------------------