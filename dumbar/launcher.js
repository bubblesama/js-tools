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
router.route("/dumbar/memories")
.get(function(request, response){
    _listAllMemories(request,response);
}).post(function(request, response){
    _createMemory(request,response);
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
var _listAllMemories = function(request, response){
    response.json({message: "todo", memories: dbGetAllMemories()});
};
var _createMemory = function(request, response){
    dbCreateMemory(request.body.type, request.body.date, request.body.info);
    response.json({message: "done", name: request.body.name});
};
// - /CONTROLLER ----------------------------------------------------------


// - OBJETS ---------------------------------------------------------------
class Person {
	constructor(name){
		this.name = name;
	}
};

class Memory {
	constructor(type, date, info){
        this.type = type;
        this.date = date;
        this.info = info;
	}
};

// - /OBJETS --------------------------------------------------------------


// - DB -------------------------------------------------------------------
var dbGetAllPersons = function(){
    var personsDbCollection = database.addCollection("person");
    var rawPersonList =  personsDbCollection.find();
    var result = [];
    //filter technical data
    for (var i=0;i<rawPersonList.length;i++){
        result.push({name: rawPersonList[i].name});
    }
    return result;
};
var dbCreatePerson = function(name){
    var personsDbCollection = database.addCollection("person");
    personsDbCollection.insertOne({name: name});
};
var dbGetAllMemories = function(){
    var memoriesDbCollection = database.addCollection("memory");
    var rawMemoryList =  memoriesDbCollection.find();
    var result = [];
    //filter technical data
    for (var i=0;i<rawMemoryList.length;i++){
        result.push({type: rawMemoryList[i].type, date: rawMemoryList[i].date, info: rawMemoryList[i].info});
    }
    return result;
};
var dbCreateMemory = function(type, date, info){
    var memoriesDbCollection = database.addCollection("memory");
    memoriesDbCollection.insertOne({type: type, date: date, info: info});
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