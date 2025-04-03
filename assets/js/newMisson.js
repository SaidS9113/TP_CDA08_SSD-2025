document.addEventListener("DOMContentLoaded", function () {
    // Sélectionner toutes les sections avec la classe 'dashboard' et 'candidatures-list'
    const forms = document.querySelectorAll(".candidatures-list");
    const missionLists = document.querySelectorAll(".mission-list");

    // Fonction pour charger et afficher les missions depuis JSON Server
    function loadMissions() {
        fetch('http://localhost:3000/missions')  // Assurez-vous que l'API est en cours d'exécution sur le port 3000
            .then(response => response.json())
            .then(missions => {
                missionLists.forEach(missionList => {
                    missionList.innerHTML = ""; // Réinitialise la liste avant de la remplir

                    missions.forEach((mission) => {
                        const li = document.createElement("li");
                        li.innerHTML = `
                            <strong>${mission.titre}</strong> - ${mission.description} 
                            (Durée: ${mission.duree}, Salaire: ${mission.salaire} €)
                            <button onclick="deleteMission(${mission.id})">❌ Supprimer</button>
                        `;
                        missionList.appendChild(li);
                    });
                });
            })
            .catch(error => console.error('Erreur:', error));
    }

    // Fonction pour envoyer la mission à JSON Server (requête POST)
    function addMission(mission) {
        fetch('http://localhost:3000/missions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mission),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Mission ajoutée:', data);
            alert('Mission ajoutée avec succès!');
            loadMissions(); // Met à jour la liste des missions après ajout
        })
        .catch(error => console.error('Erreur:', error));
    }

    // Fonction pour supprimer une mission
    window.deleteMission = function (id) {
        fetch(`http://localhost:3000/missions/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            alert("Mission supprimée avec succès !");
            loadMissions(); // Rafraîchit la liste des missions
        })
        .catch(error => console.error('Erreur:', error));
    };

    // Écouteur d'événement pour soumettre le formulaire sur toutes les pages
    forms.forEach(form => {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Empêche le rechargement de la page

            const mission = {
                titre: form.querySelector('.titre').value,
                description: form.querySelector('.description').value,
                duree: form.querySelector('.duree').value,
                salaire: form.querySelector('.salaire').value
            };

            addMission(mission); // Appel de la fonction pour envoyer la mission à l'API
            form.reset(); // Réinitialiser le formulaire
        });
    });

    // Charger les missions au démarrage
    loadMissions();
});
