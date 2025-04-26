import { useEffect, useState } from "react";
import { Card } from "./Card";
import { InGameCard } from "./InGameCard";
import { getRandomElements } from "../utils";
import { GameOver } from "./GameOver";
import { Win } from "./Win";

export function Game({ collectedCards, selectedSet, setPage }) {
  const [selectedCards, setSelectedCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [gameState, setGameState] = useState("playing");
  useEffect(() => {
    if (gameState === "over") {
      return;
    }
    const collectedCardsSet = new Set(collectedCards[selectedSet]);

    async function fetchCards() {
      const url = `public/data/cards/${selectedSet.id}.json`;
      const response = await fetch(url);
      const cards = await response.json();
      const notCollected = cards.filter((card) => !collectedCardsSet.has(card));
      const randomN = getRandomElements(notCollected, 2);
      setSelectedCards(randomN);
    }
    fetchCards();
  }, [collectedCards, selectedSet, gameState]);

  let popUpWindow;
  switch (gameState) {
    case "over":
      popUpWindow = <GameOver setGameState={setGameState} setPage={setPage} />;
      break;
    case "win":
      popUpWindow = <Win />;
      break;
    default:
      popUpWindow = null;
  }

  return (
    <div className="grid grid-cols-2">
      {popUpWindow}
      {selectedCards.map((card) => (
        <InGameCard
          key={card.id}
          card={card}
          clickedCards={clickedCards}
          setClickedCards={setClickedCards}
          setGameState={setGameState}
          setSelectedCards={setSelectedCards}
        ></InGameCard>
      ))}
    </div>
  );
}
