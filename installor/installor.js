//dependances
var fs = require("fs");
const scp = require("node-scp");
var path = require("path");

//récupération des arguments
var confPath = process.argv[2]; //installator-horoscope.json
var passphrase = process.argv[3];
//TODO contrôle des paramètres

var conf = JSON.parse(fs.readFileSync(confPath, 'utf8'));
// preparation du dossier source
// creation
var tmpSourceDirPath = conf.source.tmp+"/"+conf.name;
if (fs.existsSync(tmpSourceDirPath)){
  console.log(tmpSourceDirPath+" exists: rm then mk");
  fs.rmdirSync(tmpSourceDirPath,{recursive: true});
  fs.mkdirSync(tmpSourceDirPath,{recursive: true});
}else{
  console.log(tmpSourceDirPath+" does not exist: mk");
  fs.mkdirSync(tmpSourceDirPath,{recursive: true});
}
// copie
for (var i=0;i<conf.source.files.length;i++){
  var sourceFile = conf.source.files[i];
  var destFile = tmpSourceDirPath+"/"+path.basename(conf.source.files[i]);
  console.log("copy "+sourceFile+" to "+destFile);
  fs.copyFileSync(sourceFile, destFile);
}

//envoi

//document de test
scp({
  host: conf.target.host.ip,
  port: conf.target.host.port,
  username: "bubble",
  privateKey: fs.readFileSync(conf.target.account.key),
  passphrase: passphrase
}).then(client => {
  client.uploadFile("./test.txt", "/tmp/test/test.txt")
        .then(response => {
          client.close() // remember to close connection after you finish
        })
        .catch(error => {})
}).catch(e => console.log(e))
