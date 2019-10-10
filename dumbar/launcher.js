// INIT SERVER
var express = require('express');
var hostname = 'localhost';
var port = 8000;
var app = express();
var router = express.Router()

// ROUTING

router.route("/")
.get(function(request, response){
    _displayDefault(request,response);
});


/*
router.route("/dumbar/persons")
.get(_listAllPersons);
*/

router.route("/dumbar/persons")
.get(function(request, response){
    _listAllPersons(request,response);
});


// - BUSINESS CODE -----------------------------------------------------------

var _displayDefault = function(request, response){
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end("<html><head><title>dumbar</title></head><body><h1>dumbar</h1><p>todo, <a href='/dumbar/persons'>all</a></p></body></html>");
};


var _listAllPersons = function(request, response){
    response.json({message: "todo"});
};

// - /BUSINESS CODE ----------------------------------------------------------

// LAUNCHING SERVER
app.use(router); 
app.listen(port, hostname, function(){
	console.log("launching serveur on http://"+ hostname +":"+port); 
});