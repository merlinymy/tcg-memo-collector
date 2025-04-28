import { useEffect, useState } from "react";
import { InGameCard } from "./InGameCard";
import {
  getRandomElements,
  distributeArray,
  getOrInitializeLocalStorage,
} from "../utils";
import { GameOver } from "./GameOver";
import { Win } from "./Win";
import { FullCollection } from "./FullCollection";

export function Game({
  collectedCards,
  selectedSet,
  setPage,
  setCollectedCards,
}) {
  const localGameInfo = getOrInitializeLocalStorage("tcg-memo-gameInfo", {});
  const [selectedCards, setSelectedCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [gameState, setGameState] = useState("playing");
  const [lengthOfSet, setLengthOfSet] = useState();
  const [gameInfo, setGameInfo] = useState(localGameInfo);
  //gameInfo

  const curLevel = gameInfo.selectedSetId?.curLevel ?? 0;
  const selectedSetId = selectedSet.id;

  useEffect(() => {
    if (gameState !== "playing") {
      return;
    }

    async function fetchCards() {
      const collectedCardsSet = new Set(collectedCards[selectedSetId]);

      const url = `data/cards/${selectedSetId}.json`;
      const response = await fetch(url);
      const cards = await response.json();
      const notCollected = cards.filter(
        (card) => !collectedCardsSet.has(card.id)
      );
      const levelDistribution = distributeArray(cards.length);

      const randomN = getRandomElements(
        notCollected,
        levelDistribution[curLevel]
      );
      setSelectedCards(randomN);
      setLengthOfSet(() => cards.length);
      setGameInfo((prev) => ({
        ...prev,
        selectedSetId: {
          ...prev.selectedSetId,
          distribution: levelDistribution,
          curLevel: curLevel,
        },
      }));
    }
    fetchCards();
  }, [collectedCards, gameState, curLevel, selectedSetId]);

  // things to do when player win the round
  useEffect(() => {
    if (
      clickedCards.length === selectedCards.length &&
      selectedCards.length > 0
    ) {
      setGameState(() => "win");
      setCollectedCards((prev) => ({
        ...prev,
        [selectedSet.id]: [
          ...prev[selectedSet.id],
          ...selectedCards.map((card) => card.id),
        ],
      }));
      setGameInfo((prev) => ({
        ...prev,
        selectedSetId: {
          ...prev.selectedSetId,
          curLevel: prev.selectedSetId.curLevel + 1,
        },
      }));
    }
  }, [clickedCards, selectedCards, selectedSet, setCollectedCards]);

  useEffect(() => {
    localStorage.setItem(
      "tcg-memo-collectedCards",
      JSON.stringify(collectedCards)
    );
  }, [collectedCards]);
  useEffect(() => {
    localStorage.setItem("tcg-memo-gameInfo", JSON.stringify(gameInfo));
  }, [gameInfo]);

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
    <div className="game-wrap">
      {popUpWindow}
      {gameState === "playing" && (
        <p className="text-center">
          {selectedSet.name} - level {gameInfo.selectedSetId?.curLevel + 1}
        </p>
      )}
      {gameState === "playing" && (
        <p className="text-center">
          Cards remaining:{" "}
          {gameInfo.selectedSetId?.distribution[
            gameInfo.selectedSetId?.curLevel
          ] - clickedCards.length}
        </p>
      )}
      <div className="grid grid-cols-2 my-3.5 mx-5 gap-3.5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center">
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
    </div>
  );
}
