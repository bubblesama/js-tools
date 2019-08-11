bébé

date: été 2019

description: système de prise de notes sur les activités de bébé: boire, dormir, faire popo

mise en oeuvre 
client serveur
client: js vanilla?
server: node + express + lokidb
lien: socket.io

fonctionnalités

activites supportees
biberon, boire, couche, dodo, bain

todo list
- affichage des activités d'une journée
- sauvegarde en bdd des activités

versioning
v0.1

contrat d'interface: exemples
TODO: GET /bebe/log/20190811 // liste des activités d'une journée
socket.io: "log-get"
IN: <date ex:20190811>
OUT
{
    date: "20190811", // systématique, clé en base de la liste
    day: "dimanche", // optionnel, TODO
    activities:// systématique (peut être vide), les activités sont rangées par ordre chronologique croissant
    [
        {
            type: "boire", // systématique, le type d'activité, liste finie à mettre en oeuvre
            start: "04:56", // systématique, heure de démarrage
            end: "05:12", // optionnel (suivant le type d'activité), heure de fin
            infos: "gauche" // systématique (peut être vide), détail sur l'activité  (TODO: informations complémentaires suivant le type d'activité)
        },
        {
            //etc...
        }
    ]
}

log d'une activité unique
socket.io: "activity-put"
TODO: PUT /bebe/activity/20190811
IN
{
    date: "20190811",
    type: "boire",
    start: "04:56", // optionnel: si pas fourni, date de demande (côté serveur)
    infos: "gauche" // optionnel
}
OUT: TODO





