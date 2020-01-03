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
router.route("/dumbar/person/:code")
.get(function(request, response){
    _getPersonByCode(request,response);
}).put(function(request, response){
    _updatePersonByCode(request,response);
});
router.route("/dumbar/person/:code/memories")
.get(function(request, response){
    _getMemoriesByPersonCode(request,response);
});
router.route("/dumbar/memory/:code")
.get(function(request, response){
    //TODO
    _getMemoriesByCode(request,response);
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
var PERSON_CODE_REGEXP = /^@[a-z]([a-z_])*$/;
var PERSON_LABEL_REGEXP = /^[a-zA-Z]([a-zA-Z ])*$/;
var MEMORY_TYPE_REGEXP = /^[a-zA-Z]([a-zA-Z ])*$/;
var MEMORY_DATE_REGEXP = /^20[1-2][0-9][0-1][0-9][0-3][0-9]$/;
var MEMORY_INFOS_REGEXP = /^[a-zA-Z]([a-zA-Z ])*$/;
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
        "<p>code: <input type='text' name='code' value='@example'></p>"+
        "<p>label: <input type='text' name='label'></p>"+
        "<p><input type='submit' value='create'></p>"+
        "</form>"+
        "</body></html>"
    );
};
var _listAllPersons = function(request, response){
    response.json({status: "OK", persons: dbGetAllPersons()});
};
var _getPersonByCode = function(request, response){
    //parameter format check
    if (!request.params.code.match(PERSON_CODE_REGEXP)){
        response.json({status: "KO", message: "invalid format for @code value: "+request.params.code});
    }else{
        response.json(bizGetPersonByCode(request.params.code));
    }
};
var _getMemoriesByPersonCode = function(request, response){
    //parameter format check
    if (!request.params.code.match(PERSON_CODE_REGEXP)){
        response.json({status: "KO", message: "invalid format for @code value: "+request.params.code});
    }else{
        response.json(bizGetMemoriesByCode(request.params.code));
    }
};
var _createPerson = function(request, response){
    //parameter format check
    if (!request.body.code.match(PERSON_CODE_REGEXP)){
        response.json({status: "KO", message: "invalid format for @code value: "+request.body.code});
    }else if (!request.body.label.match(PERSON_LABEL_REGEXP)){
        response.json({status: "KO", message: "invalid format for label value: "+request.body.label});
    }else {
        var bizStatus = bizCreatePerson(request.body.code, request.body.label);
        response.json(bizStatus);
    }
};
var _updatePersonByCode = function(request, response){
    //parameter format check
    if (!request.params.code.match(PERSON_CODE_REGEXP)){
        response.json({status: "KO", message: "invalid format for @code value: "+request.params.code});
    } else if (request.body.label != null && !request.body.label.match(PERSON_LABEL_REGEXP)){
        response.json({status: "KO", message: "invalid format for label value: "+request.body.label});
    } else{
        //TODO
        response.json(bizUpdatePersonByCode(request.params.code, request.body.label));
    }
};
var _listAllMemories = function(request, response){
    response.json({status: "OK", memories: dbGetAllMemories()});
};
var _createMemory = function(request, response){
    //parameter format check
    if (!request.body.personCode.match(PERSON_CODE_REGEXP)){
        response.json({status: "KO", message: "invalid format for @personCode value: "+request.body.personCode});
    }else if (!request.body.type.match(MEMORY_TYPE_REGEXP)){
        response.json({status: "KO", message: "invalid format for type value: "+request.body.type});
    }else if (!request.body.date.match(MEMORY_DATE_REGEXP)){
        response.json({status: "KO", message: "invalid format for date value: "+request.body.date});
    }else if (!request.body.infos.match(MEMORY_INFOS_REGEXP)){
        response.json({status: "KO", message: "invalid format for infos value: "+request.body.infos});
    }else{
        bizCreateMemory(request.body.type, request.body.date, request.body.info, request.body.personCode);
        response.json({status: "OK", name: request.body.name});
    }
};
// - /CONTROLLER ----------------------------------------------------------
// - ENTITIES -------------------------------------------------------------
class Person {
	constructor(code, label){
        this.code = code;
        this.label = label;
	}
};
class Memory {
	constructor(type, date, infos, personCode){
        this.type = type;
        this.date = date;
        this.infos = infos;
        this.personCode = personCode;
	}
};
// - /ENTITIES ------------------------------------------------------------
// - BUSINESS -------------------------------------------------------------
var bizCreatePerson = function(code, label){
    var status = "OK";
    var message = "done";
    //check existing @code
    if (dbIsPersonCodeAvailable(code)){
        dbCreatePerson(code,label);
    }else{
        status = "KO";
        message = "code "+code+" already used";
    }
    return {status: status, message: message};
};
var bizUpdatePersonByCode = function(code, label){
    var status = "OK";
    var message = "done";
    //check existing @code
    if (dbIsPersonCodeAvailable(code)){
        status = "KO";
        message = "code "+code+" not used";
    }else{
        dbUpdatePersonByCode(code,label);
    }
    return {status: status, message: message};
};
var bizGetMemoriesByCode = function(code){
    var status = "OK";
    var message = "done";
    var memories = null;
    //check existing @code
    if (dbIsPersonCodeAvailable(code)){
        status = "KO";
        message = "code "+code+" not used";
    }else{
        memories = dbGetMemoriesByCode(code);
    }
    return {status: status, message: message, memories: memories};
};
var bizGetPersonByCode = function(code){
    var status = "OK";
    var message = "done";
    var person = null;
    //check existing @code
    if (dbIsPersonCodeAvailable(code)){
        status = "KO";
        message = "code "+code+" not used";
    }else{
        person = dbGetPersonByCode(code);
    }
    return {status: status, message: message, person: person};
};
var bizCreateMemory = function(type, date, infos, personCode){
    var status = "OK";
    var message = "done";
    //check existing @code
    if (dbIsPersonCodeAvailable(personCode)){
        status = "KO";
        message = "unknown person @code "+personCode;
    }else{
        dbCreateMemory(type, date, infos, personCode);
    }
    return {status: status, message: message};
};
// - /BUSINESS ------------------------------------------------------------
// - DB -------------------------------------------------------------------
var personsDbCollection;
var memoriesDbCollection;
var dbGetAllPersons = function(){
    var rawPersonList =  personsDbCollection.find();
    var result = [];
    //filter technical data
    for (var i=0;i<rawPersonList.length;i++){
        result.push({code: rawPersonList[i].code, label: rawPersonList[i].label});
    }
    return result;
};
var dbCreatePerson = function(code, label){
    personsDbCollection.insertOne({code: code, label: label});
};
var dbUpdatePersonByCode = function(code, label){
    var personByCode = personsDbCollection.findOne({code: code});
    if (personByCode != null){
        if (label != null){
            personByCode.label = label;
            personsDbCollection.update(personByCode);
            return personByCode;
        }
    }else{
        return null;
    }
};
var dbIsPersonCodeAvailable = function(code){
    var personByCode = personsDbCollection.findOne({code: code});
    if (personByCode != null){
        return false;
    }else{
        return true;
    }
};
var dbGetPersonByCode = function(code){
    //console.log("dbGetPersonByCode IN code="+code);
    var personByCode = personsDbCollection.findOne({code: code});
    if (personByCode != null){
        return {code: personByCode.code, label: personByCode.label};
    }else{
        return null;
    }
};
var dbGetAllMemories = function(){
    var rawMemoryList =  memoriesDbCollection.find();
    var result = [];
    console.log(rawMemoryList[0]);
    //filter technical data
    for (var i=0;i<rawMemoryList.length;i++){
        result.push({type: rawMemoryList[i].type, date: rawMemoryList[i].date, infos: rawMemoryList[i].infos, personCode: rawMemoryList[i].personCode});
    }
    return result;
};
var dbGetMemoriesByCode = function(code){
    var rawMemoryList =  memoriesDbCollection.find({personCode: code});
    var result = [];
    //filter technical data
    for (var i=0;i<rawMemoryList.length;i++){
        result.push({type: rawMemoryList[i].type, date: rawMemoryList[i].date, infos: rawMemoryList[i].infos, personCode: rawMemoryList[i].personCode});
    }
    return result;
};
var dbCreateMemory = function(type, date, infos, personCode){
    memoriesDbCollection.insertOne({type: type, date: date, infos: infos, personCode: personCode});
};
// - /DB ------------------------------------------------------------------
// - LAUNCHING SERVER -----------------------------------------------------
app.use(router);
database.loadDatabase(
    {},
    function(err){
        personsDbCollection = database.addCollection("person");
        memoriesDbCollection = database.addCollection("memory");
        //dbCreatePerson("John");
        app.listen(port, hostname, function(){
            console.log("launching serveur on http://"+ hostname +":"+port); 
        });
    }
);
// - /LAUNCHING SERVER ----------------------------------------------------