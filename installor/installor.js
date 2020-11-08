//dependances
var fs = require("fs");
const scp = require("node-scp");
var path = require("path");
var moment = require("moment");

//récupération des arguments
var confPath = process.argv[2]; //installator-horoscope.json
var passphrase = process.argv[3];
//TODO contrôle des paramètres

console.log("running installator with conf "+confPath);
var conf = JSON.parse(fs.readFileSync(confPath, 'utf8'));
console.log("conf name: "+conf.name);
// preparation du dossier source
// creation
var tmpSourceDirPath = conf.source.tmp+"/"+conf.name+"_"+moment().format("YYYYMMDD_HHmmSS")+"/";
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
  var sourceFile = conf.source.root+conf.source.files[i];
  var destFile = tmpSourceDirPath+conf.source.files[i];
  var relativeDestFolder = tmpSourceDirPath+path.dirname(conf.source.files[i]);
  if (!fs.existsSync(relativeDestFolder)){
    console.log(relativeDestFolder+" does not exist: mk");
    fs.mkdirSync(relativeDestFolder,{recursive: true});
  }
  console.log("copy "+sourceFile+" to "+destFile);
  fs.copyFileSync(sourceFile, destFile);
}

//envoi


var targetDistantDir = "/tmp/test/installator";
console.log("starting scp from "+tmpSourceDirPath+" to "+targetDistantDir);
//document de test
scp({
  host: conf.target.host.ip,
  port: conf.target.host.port,
  username: "bubble",
  privateKey: fs.readFileSync(conf.target.account.key),
  passphrase: passphrase
}).then(client => {
  client.uploadDir(tmpSourceDirPath, targetDistantDir)
        .then(response => {
          console.log("finished scp from "+tmpSourceDirPath+" to "+targetDistantDir);
          client.close();
        })
        .catch(error => {})
}).catch(e => console.log(e))
