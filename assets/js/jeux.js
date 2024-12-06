document.addEventListener('DOMContentLoaded', function () {
    const gameBoard = document.getElementById('game-board');
    const instruction = document.getElementById('instruction');
    const restartBtn = document.getElementById('restart-btn');
    let cardPairs = [];
    let selectedCards = [];
    let matchedPairs = 0;
    let totalPairs = 0;
    let timer;
    let timeElapsed = 0;

// Charger les données
fetch("../assets/data/question.json")
    .then((response) => response.json())
    .then((data) => {
        const urlParams = new URLSearchParams(window.location.search);
        const selectedTheme = urlParams.get('theme'); // Récupérer le paramètre 'theme' de l'URL

        if (selectedTheme && data[selectedTheme]) {
            createCardPairs(data[selectedTheme]);
        } else {
            instruction.textContent = "Aucun thème trouvé.";
            instruction.style.display = "block";
        }
    })
    .catch((error) => {
        console.error("Erreur de chargement des données:", error);
        instruction.textContent = "Erreur lors du chargement des données.";
        instruction.style.display = "block";
    });

    // Créer les paires de cartes
    function createCardPairs(cardData) {
        cardPairs = [];
        totalPairs = cardData.length;

        cardData.forEach((card, index) => {
            cardPairs.push({ text: card.front, type: 'front', questionId: index, matched: false });
            cardPairs.push({ text: card.back, type: 'back', questionId: index, matched: false });
        });

        shuffleCards();
        createGameBoard();
    }

    // Mélanger les cartes
    function shuffleCards() {
        cardPairs.sort(() => Math.random() - 0.5);
    }

    // Créer le plateau de jeu
    function createGameBoard() {
        gameBoard.innerHTML = ""; // Réinitialiser le plateau
    
        cardPairs.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.index = index;
            cardElement.dataset.questionId = card.questionId;

            // Afficher le texte de la carte immédiatement
            cardElement.textContent = card.text; 

            // Ajouter un événement de clic sur la carte
            cardElement.addEventListener('click', handleCardClick);
            gameBoard.appendChild(cardElement);
        });
    
        instruction.style.display = "none";
        startTimer();
    }

    // Gérer les clics sur les cartes
    function handleCardClick(event) {
        const selectedCard = event.target;
    
        // Ignore si la carte est déjà sélectionnée ou déjà correspondante
        if (selectedCard.classList.contains('selected') || selectedCard.classList.contains('matched')) {
            return;
        }
    
        selectedCard.classList.add('selected');
    
        // Ajouter à la sélection des cartes
        selectedCards.push(selectedCard);
    
        // Si deux cartes sont sélectionnées
        if (selectedCards.length === 2) {
            const [card1, card2] = selectedCards;
    
            // Vérifier si les cartes correspondent
            const isMatch = checkMatch(card1, card2);
    
            if (isMatch) {
                // Si elles correspondent, on les marque comme "matched"
                card1.classList.add('matched');
                card2.classList.add('matched');
            } else {
                // Si elles ne correspondent pas, on les désélectionne après un délai
                setTimeout(() => {
                    card1.classList.remove('selected');
                    card2.classList.remove('selected');
                }, 1000); // Attendre 1 seconde avant de réinitialiser
            }
    
            // Réinitialiser les cartes sélectionnées
            selectedCards = [];
        }
    }

    // Vérifier les correspondances entre les cartes
    function checkMatch(card1, card2) {
        const firstCard = cardPairs[card1.dataset.index];
        const secondCard = cardPairs[card2.dataset.index];

        if (firstCard.questionId === secondCard.questionId && firstCard.type !== secondCard.type) {
            matchedPairs++;

            // Vérification de fin de jeu
            if (matchedPairs === totalPairs) {
                clearInterval(timer);
                instruction.textContent = "Bravo, vous avez trouvé toutes les paires !";
                instruction.style.display = "block";
            }

            return true; // Les cartes correspondent
        } else {
            return false; // Les cartes ne correspondent pas
        }
    }

    // Démarrer le timer
    function startTimer() {
        timeElapsed = 0;
        timer = setInterval(() => {
            timeElapsed++;
            document.getElementById('timer').textContent = `Temps écoulé : ${timeElapsed}s`;
        }, 1000);
    }

// Bouton de redémarrage
restartBtn.addEventListener('click', () => {
    location.reload();  // Recharge la page entière
});

});
