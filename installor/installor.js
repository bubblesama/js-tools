//dependances
var fs = require("fs");
const scp = require("node-scp");

//récupération des arguments
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});

//mot de passe
var passphrase = process.argv[2];
//clé
var relativeKeyPath = "./keys/bubble_key_priv.pem"; 


//document de test
scp({
  host: "217.182.206.249",
  port: 22,
  username: "bubble",
  //password: 'password',
  privateKey: fs.readFileSync(relativeKeyPath),
  passphrase: passphrase
}).then(client => {
  client.uploadFile("./test.txt", "/tmp/test/test.txt")
        .then(response => {
          client.close() // remember to close connection after you finish
        })
        .catch(error => {})
}).catch(e => console.log(e))
