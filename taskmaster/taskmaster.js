var fs = require("fs");
var dbFile = "tasks.db";
var dbFileExists = fs.existsSync(dbFile);

console.log("open dbFile="+dbFile);

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(dbFile);

//init eventuel de la base
db.serialize(function() {
  if(!dbFileExists) {
    db.run("CREATE TABLE tasks (name TEXT)");
  }
});

console.log("init db OK");

db.close();






//COUCHE BDD


function 