document.addEventListener("DOMContentLoaded", function () {
    const candidatureTable = document.getElementById("candidature-table").getElementsByTagName("tbody")[0];

    // Fonction pour charger et afficher les candidatures depuis JSON Server
    function loadCandidatures() {
        fetch('http://localhost:3000/candidatures') // Récupérer les candidatures depuis JSON Server
            .then(response => response.json())
            .then(candidatures => {
                // Réinitialise le contenu du tableau avant de le remplir
                candidatureTable.innerHTML = '';

                // Remplir la table avec les candidatures
                candidatures.forEach(candidature => {
                    const row = document.createElement("tr");

                    // Créer les cellules pour chaque information
                    const nomCell = document.createElement("td");
                    nomCell.textContent = candidature.nom;
                    row.appendChild(nomCell);

                    const emailCell = document.createElement("td");
                    emailCell.textContent = candidature.email;
                    row.appendChild(emailCell);

                    // Trouver la mission par son ID
                    fetch(`http://localhost:3000/missions/${candidature.missionId}`)
                        .then(response => response.json())
                        .then(mission => {
                            const missionCell = document.createElement("td");
                            missionCell.textContent = mission.titre; // Afficher le titre de la mission
                            row.appendChild(missionCell);

                            // Actions (par exemple, supprimer une candidature)
                            const actionsCell = document.createElement("td");
                            const deleteButton = document.createElement("button");
                            deleteButton.textContent = "Supprimer";
                            deleteButton.onclick = function() {
                                deleteCandidature(candidature.id);
                            };
                            actionsCell.appendChild(deleteButton);
                            row.appendChild(actionsCell);

                            // Ajouter la ligne dans la table
                            candidatureTable.appendChild(row);
                        })
                        .catch(error => console.error('Erreur lors de la récupération de la mission:', error));
                });
            })
            .catch(error => console.error('Erreur:', error));
    }

    // Fonction pour supprimer une candidature
    function deleteCandidature(id) {
        fetch(`http://localhost:3000/candidatures/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            alert("Candidature supprimée avec succès !");
            loadCandidatures(); // Rafraîchit la liste des candidatures
        })
        .catch(error => console.error('Erreur:', error));
    }

    // Charger les candidatures dès que la page est prête
    loadCandidatures();
});
