# Architecture du Projet

## 1. Structure du Projet

L'architecture du projet repose sur une organisation claire des fichiers et des dossiers :

```bash
mkdir -p ./{assets/img,assets/css,assets/js,back-end-simuler,api} && \
touch ./{index.html,assets/css/style.css,assets/js/script.js,README.md,back-end-simuler/missions.json}
```

- **assets/img/** : Contient les images utilisées.
- **assets/css/** : Regroupe les fichiers CSS.
- **assets/js/** : Contient les scripts JavaScript.

## 2. Pages Principales

Le projet comprend plusieurs pages principales :

- **index.html** : Accueil affichant les missions disponibles et un formulaire de candidature.
- **admin/dashboard-admin.html** : Interface permettant l'ajout et la suppression de missions.
- **dashboard-freelance.html** : Tableau de bord des freelances pour gérer leurs candidatures.

## 3. Simulation du Back-End

Une API REST simulée est mise en place à l'aide de :
- **missions.json** (dans un dossier `back-end-simuler/`) pour stocker les missions.
- **json-server**, utilisé pour gérer les opérations CRUD (GET, POST, DELETE) sur les missions et les candidatures.

## 4. Structuration du Front-End

L'utilisation de **Sass (SCSS)** permet d'aller plus vite en imbriquant des attributs globaux les un des autres dans leur parents :
- Une meilleure structuration des styles.
- L'utilisation de variables et de mixins réutilisables.
- Une compilation automatique en CSS.

Le projet et responsive avec un menu burger pour petite appareille 

## 5. Fonctionnalités Implémentées

Différents scripts assurent la gestion des fonctionnalités principales :
- **route.js** : Gestion centralisée des routes API (GET/POST/DELETE).
- **newMission.js** : Ajout de nouvelles missions via l'API.
- **newCandidature.js** : Gestion des candidatures des freelances.
- **candidatureList.js** : Affichage des candidatures soumises.

## 6. Suivi et Gestion du Projet

Deux fichiers permettent un suivi efficace :
- **BUGS** : Liste des bugs à corriger.
- **TASKS** : Liste des tâches en cours et à venir.

## 7. Versioning

Une gestion efficace du code source est assurée par :
- **Git** pour le suivi des modifications en local.
- Des commits simples.
- Un dépot de sauvegarde du codage distant

- git init
- git remote add origin <https://github.com/SaidS9113/TP_CDA08_SSD-2025>
- git commit -m "Premier commit"
- git branch -M main
- git push -u origin main


## 8. Documentation et Installation de l'environnement

### 
- Installation du VsCode
- Installation de node.js pour télécharger le préprocesseur Scss
- Installation de **Node.js** et **npm**.
- Installation de **json-server** :
  ```bash
  npm install -g json-server
  ```

### Lancement du Serveur JSON

```bash
json-server --watch back-end-simuler/missions.json --port 3000
```

### Lancement du Projet

Ouvrir `index.html` dans un navigateur via Go Live via l'IDE pour voir les routes du back-end :

- http://localhost:3000/missions
- http://localhost:3000/candidatures

