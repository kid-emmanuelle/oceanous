import React, { useState } from "react";
import "../css/quizzPage"; // Import du fichier CSS
import data from "../data/question.json";

function QuizzPage() {
  const [selectedTheme, setSelectedTheme] = useState(null); // Thème sélectionné
  const [index, setIndex] = useState(0); // Index actuel
  const [isFlipped, setIsFlipped] = useState(false); // État pour savoir si la carte est retournée
  const [isChanging, setIsChanging] = useState(false); // État pour bloquer les actions pendant le changement

  // Récupérer les cartes du thème sélectionné
  const cards = selectedTheme ? data[selectedTheme] : [];

  // Fonction pour changer de carte
  const changeCard = (newIndex) => {
    if (isChanging) return; // Empêche les actions pendant une transition
    if (isFlipped) {
      // Si la carte est en verso, attendre qu'elle retourne au recto
      setIsChanging(true); // Bloque les actions
      setIsFlipped(false); // Retourne la carte au recto
      setTimeout(() => {
        setIndex(newIndex); // Change l'index après le retour
        setIsChanging(false); // Libère les actions
      }, 300); // Délai synchronisé avec l'animation CSS
    } else {
      // Si la carte est déjà au recto, changer immédiatement
      setIndex(newIndex);
    }
  };

  const handlePrev = () => {
    const newIndex = index === 0 ? cards.length - 1 : index - 1;
    changeCard(newIndex);
  };

  const handleNext = () => {
    const newIndex = index === cards.length - 1 ? 0 : index + 1;
    changeCard(newIndex);
  };

  // Fonction pour retourner la carte
  const handleFlip = () => {
    if (!isChanging) setIsFlipped(!isFlipped); // Retourne la carte si aucune transition en cours
  };

  // Fonction pour changer de thème
  const handleThemeChange = (event) => {
    const theme = event.target.value; // Récupère la valeur du menu déroulant
    setSelectedTheme(theme !== "" ? theme : null); // Met à jour le thème sélectionné
    setIndex(0); // Réinitialise l'index à 0
    setIsFlipped(false); // Réinitialise l'état de retournement
  };

  return (
    <div className="container">
      {/* Menu déroulant pour sélectionner un thème */}
      <div className="theme-selection">
        <select
          onChange={handleThemeChange}
          value={selectedTheme || ""}
          className="theme-dropdown"
        >
          <option value="">Select a theme</option>
          {Object.keys(data).map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>

      {/* Vérifie si un thème est sélectionné */}
      {selectedTheme ? (
        <>
          {/* Carte */}
          <div
            className={`card ${isFlipped ? "flipped" : ""}`}
            onClick={handleFlip} // Ajoute l'événement de clic pour retourner la carte
          >
            <div className="card-inner">
              <div className="card-front">
                <p className="text">{cards[index].front}</p>
              </div>
              <div className="card-back">
                <p className="text">{cards[index].back}</p>
              </div>
            </div>
          </div>

          {/* Boutons de navigation */}
          <div className="navigation">
            <button className="button" onClick={handlePrev} disabled={isChanging}>
              &#8592;
            </button>
            <span className="counter">
              {index + 1}/{cards.length}
            </span>
            <button className="button" onClick={handleNext} disabled={isChanging}>
              &#8594;
            </button>
          </div>
        </>
      ) : (
        <p className="instruction">Please select a theme to start!</p>
      )}
    </div>
  );
}

export default QuizzPage;
