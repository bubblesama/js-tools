Gestionnaire de tâches

status: en prod, feature complete?

# installation en PROD
compilation et envoi sur VPS1: 
from installor: node installor.js installator-taskmaster.json <mdp clé>
déploiement sur VPS1
from /projects/deploy: ./taskmaster_deploy.sh

# release notes
V1.5.3 EN PROD
    fix & polish
    script d'installation
V1.5.2
    fix & polish
V1.5.1
    gestion des suggestions de repas
    polish divers
V1.5.0
    bouton "hier" pour les dates de repas
    version simple de suggestion de repas
V1.4.0
    suivi des comptages de repas affichés
    revue style
    édition des repas
V1.3.0 suivi complet des comptages de tickets affichés
V1.2.0 comptage des tickets crées
V1.1.0 
    style CSS
    mobile friendly
    prototype de comptage
V1.0.0
    repas: date, temps, convives, cuisinier, menu
    affichage de repas
    ajout de repas
    synhronisatio ndes repas par dump
    déploiement serveur


# netcode

## front
date du jour
https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript