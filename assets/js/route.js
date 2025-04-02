document.addEventListener('DOMContentLoaded', () => {
    // Charger les missions au chargement de la page
    fetchMissions();

    // Gérer le formulaire de candidature
    const candidatureForm = document.getElementById('candidature-form');
    candidatureForm.addEventListener('submit', handleFormSubmit);

    // Gérer le menu mobile
    const burgerIcon = document.getElementById('burger-icon');
    const mobileMenu = document.getElementById('mobile-menu');
    burgerIcon.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
});

// Fonction pour charger les missions depuis l'API (GET)
function fetchMissions() {
    // Requête GET pour récupérer les missions
    fetch('http://localhost:3000/missions')
        .then(response => response.json())
        .then(data => {
            displayMissions(data);  // Afficher les missions
            fillMissionSelect(data); // Remplir le sélecteur de mission dans le formulaire
        })
        .catch(error => console.error('Erreur de chargement des missions:', error));
}

// Fonction pour afficher les missions dans le DOM
function displayMissions(missions) {
    const missionList = document.getElementById('missions-list');
    missionList.innerHTML = '';  // Réinitialiser la liste des missions

    missions.forEach(mission => {
        const missionDiv = document.createElement('div');
        missionDiv.classList.add('mission-item');
        missionDiv.innerHTML = `
            <h3>${mission.titre}</h3>
            <p><strong>Description :</strong> ${mission.description}</p>
            <p><strong>Durée :</strong> ${mission.duree}</p>
            <p><strong>Salaire :</strong> ${mission.salaire}</p>
            <button class="delete-btn" data-id="${mission.id}">Supprimer</button>
        `;
        missionList.appendChild(missionDiv);

        // Ajouter l'événement pour supprimer la mission
        const deleteButton = missionDiv.querySelector('.delete-btn');
        deleteButton.addEventListener('click', () => {
            // Vérification pour empêcher la suppression de la mission avec l'ID 1
            if (mission.id === 1) {
                alert('La mission avec l\'ID 1 ne peut pas être supprimée.');
            } else {
                deleteMission(mission.id);
            }
        });
    });
}

// Fonction pour remplir le sélecteur de mission dans le formulaire
function fillMissionSelect(missions) {
    const missionSelect = document.getElementById('mission-select');
    missionSelect.innerHTML = ''; // Réinitialiser le sélecteur

    missions.forEach(mission => {
        const option = document.createElement('option');
        option.value = mission.id;
        option.textContent = mission.titre;
        missionSelect.appendChild(option);
    });
}

// Fonction pour gérer l'envoi de la candidature via POST
function handleFormSubmit(event) {
    event.preventDefault();  // Empêcher la soumission classique du formulaire

    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;
    const missionId = document.getElementById('mission-select').value;

    const candidature = {
        nom: nom,
        email: email,
        mission_id: missionId,
        date_candidature: new Date().toISOString(),
    };

    // Requête POST pour envoyer la candidature
    fetch('http://localhost:3000/candidatures', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(candidature),
    })
    .then(response => response.json())
    .then(data => {
        alert('Candidature envoyée avec succès');
        // Réinitialiser le formulaire
        document.getElementById('candidature-form').reset();
    })
    .catch(error => console.error('Erreur lors de l\'envoi de la candidature:', error));
}

// Fonction pour supprimer une mission (DELETE)
function deleteMission(missionId) {
    fetch(`http://localhost:3000/missions/${missionId}`, {
        method: 'DELETE',
    })
    .then(() => {
        alert('Mission supprimée avec succès');
        fetchMissions(); // Recharge les missions après suppression
    })
    .catch(error => console.error('Erreur lors de la suppression de la mission:', error));
}
