// Variables globales
let data = null; // Stocke les données JSON
let selectedTheme = null;
let index = 0;
let isFlipped = false;
let isChanging = false;

// Éléments DOM
const themeDropdown = document.getElementById("theme-dropdown");
const quizCard = document.getElementById("quiz-card");
const cardFrontText = document.getElementById("card-front-text");
const cardBackText = document.getElementById("card-back-text");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const counter = document.getElementById("counter");
const instruction = document.getElementById("instruction");
const navigation = document.getElementById("navigation");
const startBtn = document.getElementById("start-btn");

// Fonction pour charger les données JSON
function loadData() {
    fetch("../assets/data/question.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((jsonData) => {
            data = jsonData;
            console.log("Données JSON récupérées :", data); // Vérification des données
            renderThemes();
        })
        .catch((error) => {
            console.error("Erreur lors du chargement des données JSON :", error);
            instruction.textContent = "Erreur lors du chargement des données.";
            instruction.style.display = "block";
        });
}

// Fonction pour afficher les thèmes dans le menu déroulant
function renderThemes() {
    if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
        console.error("Données JSON invalides ou vides.");
        instruction.textContent = "Aucun thème disponible.";
        instruction.style.display = "block";
        return;
    }

    Object.keys(data).forEach((theme) => {
        const option = document.createElement("option");
        option.value = theme;
        option.textContent = theme;
        themeDropdown.appendChild(option);
    });
}

// Met à jour la carte actuelle
function updateCard() {
    const cards = selectedTheme ? data[selectedTheme] : [];
    console.log("Cartes pour le thème sélectionné : ", cards); // Vérification des cartes

    if (cards.length === 0) {
        quizCard.style.display = "none";
        navigation.style.display = "none";
        instruction.textContent = "Aucune carte disponible pour ce thème.";
        instruction.style.display = "block";
        return;
    }

    const card = cards[index];
    cardFrontText.textContent = card.front;
    cardBackText.textContent = card.back;
    counter.textContent = `${index + 1}/${cards.length}`;
    quizCard.style.display = "block";
    navigation.style.display = "flex";
    instruction.style.display = "none";
}

// Gère le retournement de la carte
function handleFlip() {
    if (!isChanging) {
        isFlipped = !isFlipped;
        quizCard.classList.toggle("flipped", isFlipped);
    }
}

// Change de carte avec un nouvel index
function changeCard(newIndex) {
    if (isChanging) return;

    if (isFlipped) {
        isChanging = true;
        isFlipped = false;
        quizCard.classList.remove("flipped");
        setTimeout(() => {
            index = newIndex;
            updateCard();
            isChanging = false;
        }, 300);
    } else {
        index = newIndex;
        updateCard();
    }
}

// Navigation - Précédente
function handlePrev() {
    const cards = data[selectedTheme];
    const newIndex = index === 0 ? cards.length - 1 : index - 1;
    changeCard(newIndex);
}

// Navigation - Suivante
function handleNext() {
    const cards = data[selectedTheme];
    const newIndex = index === cards.length - 1 ? 0 : index + 1;
    changeCard(newIndex);
}

// Gère le changement de thème
function handleThemeChange() {
    selectedTheme = themeDropdown.value;
    if (selectedTheme) {
        index = 0;
        updateCard();
        startBtn.style.display = "block"; // Affiche le bouton "Commencer"
    } else {
        quizCard.style.display = "none";
        navigation.style.display = "none";
        instruction.textContent = "Veuillez sélectionner un thème.";
        instruction.style.display = "block";
        startBtn.style.display = "none"; // Cache le bouton
    }
}

// Fonction de redirection vers la page jeux.js
function redirectToJeuxPage() {
    if (selectedTheme) {
        const url = `jeux.html?theme=${encodeURIComponent(selectedTheme)}`;
        window.location.href = url; // Redirige vers la page jeux.html avec le thème en paramètre
    }
}

// Écouteurs d'événements
themeDropdown.addEventListener("change", handleThemeChange);
prevBtn.addEventListener("click", handlePrev);
nextBtn.addEventListener("click", handleNext);
quizCard.addEventListener("click", handleFlip);

// Ajout de l'écouteur d'événement pour rediriger vers jeux.js
startBtn.addEventListener("click", redirectToJeuxPage);

// Initialisation
loadData();
