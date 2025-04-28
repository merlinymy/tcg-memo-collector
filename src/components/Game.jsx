import { use, useEffect, useState } from "react";
import { Card } from "./Card";
import { InGameCard } from "./InGameCard";
import { getRandomElements } from "../utils";
import { GameOver } from "./GameOver";
import { Win } from "./Win";
import { FullCollection } from "./FullCollection";

export function Game({
  collectedCards,
  selectedSet,
  setPage,
  setCollectedCards,
}) {
  const [selectedCards, setSelectedCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [gameState, setGameState] = useState("playing");
  const [level, setLevel] = useState(4);
  const [lengthOfSet, setLengthOfSet] = useState();

  useEffect(() => {
    if (gameState !== "playing") {
      return;
    }
    const collectedCardsSet = new Set(collectedCards[selectedSet.id]);

    async function fetchCards() {
      const url = `data/cards/${selectedSet.id}.json`;
      const response = await fetch(url);
      const cards = await response.json();
      const notCollected = cards.filter(
        (card) => !collectedCardsSet.has(card.id)
      );
      console.log(notCollected.length);
      const randomN = getRandomElements(notCollected, level);
      setSelectedCards(randomN);
      setLengthOfSet(() => cards.length);
    }
    fetchCards();
  }, [collectedCards, selectedSet, gameState, level]);

  // things to do when player win the round
  useEffect(() => {
    if (
      clickedCards.length === selectedCards.length &&
      selectedCards.length > 0
    ) {
      //   setGameState(() => "win");
      // debug
      setGameState(() => "setCollected");
      setCollectedCards((prev) => ({
        ...prev,
        [selectedSet.id]: [
          ...prev[selectedSet.id],
          ...selectedCards.map((card) => card.id),
        ],
      }));
    }
  }, [clickedCards, selectedCards, selectedSet, setCollectedCards]);

  useEffect(() => {
    if (collectedCards[selectedSet.id].length === lengthOfSet) {
      setGameState("setCollected");
    }
  }, [collectedCards, lengthOfSet, selectedSet]);

  let popUpWindow;
  switch (gameState) {
    case "over":
      popUpWindow = (
        <GameOver
          setGameState={setGameState}
          setPage={setPage}
          setClickedCards={setClickedCards}
        />
      );
      break;
    case "win":
      popUpWindow = (
        <Win
          setGameState={setGameState}
          setPage={setPage}
          setClickedCards={setClickedCards}
        />
      );
      break;
    case "setCollected":
      popUpWindow = (
        <FullCollection
          setGameState={setGameState}
          setPage={setPage}
          setClickedCards={setClickedCards}
        ></FullCollection>
      );
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
          gameState={gameState}
        ></InGameCard>
      ))}
    </div>
  );
}
