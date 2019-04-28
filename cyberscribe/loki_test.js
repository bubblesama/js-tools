var loki = require('lokijs');
var database = new loki(
    'test-loki-db.json',
    {
        autosave: "true",
        autosaveInterval: 2000,
    }
);


database.loadDatabase(
    {},
    function(err){
        console.log("loaded");
        for (var collection in database.listCollections()){
            console.log("collection! "+collection);
        }
        var messages = database.getCollection("messages");

        var message = messages.findOne({from:"paul"});
        console.log("message: "+message);
        if (message != null){

            message.count += 1;
            messages.update(message);
            console.log("message count: "+message.count);
        }else{
            messages.insert({from:"paul", to:"lise",content:"pouet", count:1});
        }
       //database.saveDatabase(); 
    }
);



