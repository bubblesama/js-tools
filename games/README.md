Serveur JS de jeux avec client

statut: WIP


Description fonctionnelle

Un jeu rassemble plusieurs joueurs au cours d'une partie
Un jeu possède une condition de fin.
Un jeu est composé de plusieurs tours (de jeu).

Cyber tips
gestion des proprietes avec variables d'environnement
https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786


Petits chevaux


Référence
https://fr.wikipedia.org/wiki/Jeu_des_petits_chevaux
https://www.regledujeu.fr/petits-chevaux/

Actions

joindre partie
conditions
moins de 4 joueurs
effets
nouveau joueur dans la liste

lancer partie
conditions
joueur créateur
plus de 1 joueur
partie pas démarrée
effets
partie démarrée
reset des petits chevaux
choix d'un premier joueur
activation d'un joueur (le premier)
dé à lancer

lancer dé
conditions
joueur actif
dé à lancer OU (valeur du dé 6 ET dé consommé)
effets
valeur du dé fixée
dé pas consommé
dé lancé

sortir cheval (X = 1 ou 2)
conditions
joueur actif
valeur du dé = 6
dé pas consommé
cheval X pas sorti
effets
dé sur la case départ du joueur
dé consommé

avancer cheval (X = 1 ou 2)
conditions
joueur actif
dé pas consommé
cheval X sort
au moins un cheval "avançable" (à détailler)
effets
avancer cheval (à détailler)

finir tour
conditions
joueur actif
dé consommé ET valeur du dé != 6 ET dé lancé
OU
aucun cheval "avançable" (à détailler)
effets
dé pas consommé
valeur du dé pas définie
dé pas lancé
nouveau joueur actif


