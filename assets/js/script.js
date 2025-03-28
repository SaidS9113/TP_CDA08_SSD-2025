document.addEventListener("DOMContentLoaded", function () {
    const burgerIcon = document.getElementById("burger-icon");
    const mobileMenu = document.getElementById("mobile-menu");
    const desktopMenu = document.querySelector(".liste-lien-destock");

    // Vérifier si les éléments existent avant d'ajouter des événements
    if (burgerIcon && mobileMenu && desktopMenu) {
        // Assurer que la navbar destock est bien visible sur desktop et cachée sur mobile
        function checkScreenSize() {
            if (window.innerWidth > 768) {
                desktopMenu.style.display = "flex"; // Afficher la navbar destock
                mobileMenu.style.display = "none"; // Cacher le menu mobile
            } else {
                desktopMenu.style.display = "none"; // Cacher la navbar destock sur mobile
                mobileMenu.style.display = "none"; // Cacher le menu mobile
            }
        }

        // Vérifier la taille de l'écran au chargement de la page
        checkScreenSize();

        // Ajouter un event listener pour le redimensionnement
        window.addEventListener("resize", checkScreenSize);

        // Événement pour ouvrir/fermer le menu mobile
        burgerIcon.addEventListener("click", function () {
            if (mobileMenu.style.display === "none" || mobileMenu.style.display === "") {
                mobileMenu.style.display = "block"; // Afficher le menu mobile
            } else {
                mobileMenu.style.display = "none"; // Cacher le menu mobile
            }
        });
    }
});
