//dependances
var fs = require("fs");
const scpClient= require("scp2");
var path = require("path");
var moment = require("moment");

//récupération des arguments
var confPath = process.argv[2]; //installator-<projet>.json
var passphrase = process.argv[3];
//TODO contrôle des paramètres

console.log("running installator with conf "+confPath);
var conf = JSON.parse(fs.readFileSync(confPath, 'utf8'));
console.log("conf name: "+conf.name);
// preparation du dossier source
// creation
var tmpSourceDirPath = conf.name+"_"+moment().format("YYYYMMDD_HHmmSS")+"/";
var tmpSourceDirFullPath = conf.source.tmp+"/"+tmpSourceDirPath;
if (fs.existsSync(tmpSourceDirFullPath)){
  console.log(tmpSourceDirFullPath+" exists: rm then mk");
  fs.rmdirSync(tmpSourceDirFullPath,{recursive: true});
  fs.mkdirSync(tmpSourceDirFullPath,{recursive: true});
}else{
  console.log(tmpSourceDirFullPath+" does not exist: mk");
  fs.mkdirSync(tmpSourceDirFullPath,{recursive: true});
}
// copie
for (var i=0;i<conf.source.files.length;i++){
  var sourceFile = conf.source.root+conf.source.files[i];
  var destFile = tmpSourceDirFullPath+conf.source.files[i];
  var relativeDestFolder = tmpSourceDirFullPath+path.dirname(conf.source.files[i]);
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
scpClient.scp(
  "test.txt",
  {
    host: conf.target.host.ip,
    port: conf.target.host.port,
    username: "bubble",
    privateKey: fs.readFileSync(conf.target.account.key),
    passphrase: passphrase,
    path: '/tmp/test/'
  },
  function(err){console.log("done");}
);

//dossier
scpClient.scp(
  tmpSourceDirFullPath,
  {
    host: conf.target.host.ip,
    port: conf.target.host.port,
    username: "bubble",
    privateKey: fs.readFileSync(conf.target.account.key),
    passphrase: passphrase,
    path: '/tmp/test/installator/'+tmpSourceDirPath
  },
  function(err){console.log("done");}
);
