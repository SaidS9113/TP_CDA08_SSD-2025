document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("candidature-form");
    const missionSelect = document.getElementById("mission-select");

    // Fonction pour charger les missions dans le select
    function loadMissions() {
        fetch('http://localhost:3001/missions') // Récupérer les missions depuis JSON Server
            .then(response => response.json())
            .then(missions => {
                missionSelect.innerHTML = ''; // Réinitialiser le sélecteur avant de le remplir
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Choisissez une mission';
                missionSelect.appendChild(defaultOption);

                // Remplir le select avec les missions
                missions.forEach(mission => {
                    const option = document.createElement('option');
                    option.value = mission.id; // L'ID de la mission
                    option.textContent = mission.titre; // Le titre de la mission
                    missionSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erreur:', error));
    }

    // Fonction pour envoyer la candidature au backend (JSON Server)
    function submitCandidature(candidature) {
        fetch('http://localhost:3001/candidatures', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(candidature), // Envoyer la candidature sous forme JSON
        })
        .then(response => response.json())
        .then(data => {
            console.log('Candidature envoyée:', data);
            alert('Votre candidature a été envoyée avec succès !');
        })
        .catch(error => console.error('Erreur:', error));
    }

    // Écouteur d'événement pour soumettre le formulaire
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Empêcher le rechargement de la page

        const candidature = {
            nom: document.getElementById('nom').value,
            email: document.getElementById('email').value,
            missionId: missionSelect.value, // ID de la mission choisie
        };

        if (candidature.missionId) {
            submitCandidature(candidature); // Appel de la fonction pour envoyer la candidature à l'API
            form.reset(); // Réinitialiser le formulaire
        } else {
            alert("Veuillez choisir une mission.");
        }
    });

    // Charger les missions dès que la page est prête
    loadMissions();
});
