# Marmitada API
API pour le site Marmitada, réalisé par Maéla Laconi et Mathieu Tabary.

# Veuillez commencer par faire les installations de l'interface web
Les instructions d'installations se trouvent ici : [https://github.com/MaelaLaconi/marmitadaFront](https://github.com/MaelaLaconi/marmitadaFront)

La documentation se trouve ici [http://localhost:3000/documentation/static/index.html](http://localhost:3000/documentation/static/index.html)

## Installation de la base de donnée
La base de donnée utilisée est mongodb, nous allons faire tourner une instance via docker et accéder aux données via Robo3T.

### Mise en place du container docker pour le serveur de la base de donnée
Avec les droits administrateurs exécutez les instructions suivantes : 

```
docker pull mongo
docker run --name mongodb -p 27017:27017 -d mongo
```
La première ligne va récupérer la dernière version de mongo.
La seconde ligne va instancier un container docker, nommé mongodb, qui va écouter le port 27017, et qui va exécuter un serveur mongo.

### Population de la base de donnée
Une fois le container mongodb lancé, ouvrez le logiciel Robo3T (téléchargeable [ici](https://robomongo.org/)).

Dans l'interface Robo3T, connectez vous au serveur mongodb (File -> Connect -> Create -> Save).

Une fois connecté, créez une base de donnée (Sur la connection : Clic-droit -> Create Database -> "marmitada" -> Create).

Sur la base de donnée marmitada : Collection -> Clic-droit -> Create Collection... -> "recipes" -> Create).

Avec la collection créée, pour la populer il va vous falloir copier le contenu du fichier de script [./scripts/init.mongo.js](./scripts/init.mongo.js)
et le coller dans le shell de robot3T, puis exécuter la requête (touche F5).

Recommencez cette étape avec le contenu du fichier [./scripts/index.mongo.js](./scripts/index.mongo.js)

### Lancement de l'application Nest
Avec la base de donnée en cours d'exécution et initialisée, exécutez les commandes suivantes : 

```
git clone https://github.com/MaelaLaconi/marmitadaBack.git
cd marmitadaBack
yarn global add @nestjs/cli
yarn install
yarn run start
```

