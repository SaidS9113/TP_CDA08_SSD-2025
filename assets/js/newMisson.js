document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('candidatures-list');
    const titreInput = document.getElementById('titre');
    const descriptionInput = document.getElementById('description');
    const dureeInput = document.getElementById('duree');
    const salaireInput = document.getElementById('salaire');
    const missionList = document.querySelector('.mission-list');
    
    // Fonction pour récupérer les missions depuis le serveur
    function fetchMissions() {
        fetch('http://localhost:3001/missions')
            .then(response => response.json())
            .then(missions => {
                missionList.innerHTML = '';
                missions.forEach(mission => {
                    const li = document.createElement('li');
                    li.textContent = `${mission.titre} - ${mission.description} - ${mission.duree} - ${mission.salaire}`;
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Supprimer';
                    deleteButton.addEventListener('click', () => deleteMission(mission.id));
                    li.appendChild(deleteButton);
                    missionList.appendChild(li);
                });
            })
            .catch(err => console.log('Erreur lors de la récupération des missions :', err));
    }

    // Fonction pour ajouter une mission
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const mission = {
            titre: titreInput.value,
            description: descriptionInput.value,
            duree: dureeInput.value,
            salaire: salaireInput.value
        };

        // Envoi des données au serveur pour ajouter la mission
        fetch('http://localhost:3001/missions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mission)
        })
        .then(response => response.json())
        .then(data => {
            // Effacer le formulaire après l'ajout
            titreInput.value = '';
            descriptionInput.value = '';
            dureeInput.value = '';
            salaireInput.value = '';

            // Rafraîchir la liste des missions
            fetchMissions();
        })
        .catch(err => console.log('Erreur lors de l\'ajout de la mission :', err));
    });

    // Fonction pour supprimer une mission
    function deleteMission(id) {
        fetch(`http://localhost:3001/missions/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            // Rafraîchir la liste des missions après la suppression
            fetchMissions();
        })
        .catch(err => console.log('Erreur lors de la suppression de la mission :', err));
    }

    // Charger les missions au démarrage
    fetchMissions();
});
