#!/bin/bash
# script de deploiement d'une version déjà livrée sur la machine VPS1
# à déployer dans /projects/deploy


# conf sur la machine
packagePath="/tmp/test/installator"
projectName="taskmaster"
projectPath="/projects"
projectDatabase="tasks.db"
projectLauncher="taskmaster.js"

currentPath=`pwd`

echo "#deploy livraison du projet $projectName"
# check d'un dossier à livrer pour la date du jour
todate=`date +"%Y%m%d"`
echo "#deploy date du jour: $todate"
packageSearch="${projectName}_${todate}_*"
echo "#deploy sous-chemin recherché: $packageSearch"
if [ $(find $packagePath -maxdepth 1 -type d -name "$packageSearch" | wc -l) -lt 1 ]; then
    echo "#deploy pas de dossier de type $packageSearch dans $packagePath, OUT"
    exit 0
else
    echo "#deploy dossier de type $packageSearch trouvé"
fi
packageFolder=`find $packagePath -maxdepth 1 -type d -name "$packageSearch" | sort -n | tail -1`
echo "#deploy dossier à déployer: $packageFolder"
# recuperation de la version du service à livrer
if [ ! -f ${packageFolder}/package.json ]; then
    echo "#deploy pas de ${packageFolder}/package.json! OUT"
    exit 0
fi
serviceVersion=`cat ${packageFolder}/package.json | grep version | cut -d'"' -f4`
echo "#deploy version du service $taskmaster: $serviceVersion"
# verification que la version n'est pas déjà déployée (pas de SNAPSHOT)
if [ $(echo $serviceVersion | grep "SNAPSHOT" | wc -l) -gt 0 ]; then
    echo "#deploy version SNAPSHOT! OUT"
    exit 0
fi
targetProjectFolder="$projectPath/${projectName}-$serviceVersion"
echo "#deploy dossier cible de déploiement: $targetProjectFolder"
if [ -d $targetProjectFolder ]; then
    echo "#deploy dossier cible $targetProjectFolder déjà existant: OUT"
    exit 0
fi

# creation du dossier
mkdir -p $targetProjectFolder
echo "#deploy dossier cible $targetProjectFolder créé"
# installation
cd $targetProjectFolder
cp -r ${packageFolder}/* .
npm install
echo "#deploy copie et installation depuis ${packageFolder} vers $targetProjectFolder faites"

#coupure du service
cd "${projectPath}/${projectName}"
sudo forever stop $projectLauncher
echo "#deploy service coupé"

#copie de la BDD
cp ${projectPath}/${projectName}/${projectDatabase} $targetProjectFolder
echo "#deploy base $projectDatabase copiée de ${projectPath}/${projectName}/${projectDatabase} vers $targetProjectFolder"

#suppression du lien symbolique
rm ${projectPath}/${projectName}
echo "#deploy lien ${projectPath}/${projectName} supprimé"

#creation du nouveau lien
cd ${projectPath}
ln -s ${projectName}-$serviceVersion ${projectName}
echo "#deploy lien de ${projectName}-$serviceVersion vers ${projectName} créé"

#demarrage du service
cd "${projectPath}/${projectName}"
sudo forever start $projectLauncher

cd $currentPath