// includes.js - Système d'inclusion de composants HTML

async function includeHTML() {
    // Sélectionner tous les éléments avec l'attribut data-include
    const elements = document.querySelectorAll('[data-include]');

    // Parcourir chaque élément
    for (const element of elements) {
        const file = element.getAttribute('data-include');

        try {
            // Charger le fichier
            const response = await fetch(file);

            if (response.ok) {
                const html = await response.text();
                element.innerHTML = html;

                // Optionnel : supprimer l'attribut data-include après chargement
                element.removeAttribute('data-include');
            } else {
                console.error(`Erreur de chargement: ${file} (${response.status})`);
                element.innerHTML = `<p style="color: red;">Erreur de chargement du composant</p>`;
            }
        } catch (error) {
            console.error(`Erreur lors du chargement de ${file}:`, error);
            element.innerHTML = `<p style="color: red;">Impossible de charger le composant</p>`;
        }
    }

    // Après le chargement, réexécuter les scripts si nécessaire
    reinitializeScripts();
}

// Fonction pour réinitialiser les scripts après chargement des composants
function reinitializeScripts() {
    // Si tu as des event listeners dans le footer/header, tu peux les réinitialiser ici
    // Exemple : réinitialiser le smooth scrolling
    if (typeof initSmoothScroll === 'function') {
        initSmoothScroll();
    }
}

// Charger les composants quand le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', includeHTML);
} else {
    // Si le DOM est déjà chargé (cas rare)
    includeHTML();
}