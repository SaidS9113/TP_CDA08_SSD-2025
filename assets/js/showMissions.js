document.addEventListener('DOMContentLoaded', () => {
    const missionTableBody = document.querySelector('.missions-table__body');

    // Fonction pour récupérer les missions depuis le serveur
    function fetchMissions() {
        fetch('http://localhost:3001/missions')
            .then(response => response.json())
            .then(missions => {
                missionTableBody.innerHTML = ''; // On vide la table existante avant de la remplir
                missions.forEach(mission => {
                    const tr = document.createElement('tr');
                    tr.classList.add('missions-table__row'); // Ajout d'une classe unique à chaque ligne

                    // Ajouter une cellule pour chaque colonne
                    const tdTitre = document.createElement('td');
                    tdTitre.textContent = mission.titre;
                    tdTitre.classList.add('missions-table__cell');
                    tr.appendChild(tdTitre);

                    const tdDescription = document.createElement('td');
                    tdDescription.textContent = mission.description;
                    tdDescription.classList.add('missions-table__cell');
                    tr.appendChild(tdDescription);

                    const tdDuree = document.createElement('td');
                    tdDuree.textContent = mission.duree;
                    tdDuree.classList.add('missions-table__cell');
                    tr.appendChild(tdDuree);

                    const tdSalaire = document.createElement('td');
                    tdSalaire.textContent = mission.salaire;
                    tdSalaire.classList.add('missions-table__cell');
                    tr.appendChild(tdSalaire);

                    // Ajouter un bouton "Supprimer"
                    const tdActions = document.createElement('td');
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Supprimer';
                    deleteButton.classList.add('missions-table__delete-button');
                    deleteButton.addEventListener('click', () => deleteMission(mission.id));
                    tdActions.appendChild(deleteButton);
                    tdActions.classList.add('missions-table__cell');
                    tr.appendChild(tdActions);

                    // Ajouter la ligne au corps du tableau
                    missionTableBody.appendChild(tr);
                });
            })
            .catch(err => console.log('Erreur lors de la récupération des missions :', err));
    }

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

    // Charger les missions au démarrage de la page
    fetchMissions();
});
