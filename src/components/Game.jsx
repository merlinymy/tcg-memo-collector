import { useEffect, useState } from "react";
import { InGameCard } from "./InGameCard";
import {
  getRandomElements,
  distributeArray,
  getOrInitializeLocalStorage,
} from "../utils";
import { PopupWindow } from "./PopupWindow";
import AudioManager from "../audio/AudioManager";

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
  const selectedSetId = selectedSet.id;
  const [flipped, setFlipped] = useState(false);

  const curLevel = gameInfo[selectedSetId]?.curLevel ?? 0;
  const endlessLevel = gameInfo[selectedSetId]?.endlessRound ?? 1;
  const endlessScore = gameInfo[selectedSetId]?.endlessScore ?? 0;
  const endlessHighScore = gameInfo[selectedSetId]?.endlessHighScore ?? 0;
  const isInEndless = gameInfo[selectedSetId]?.endlessRound ? true : false;
  const [enableTutorial, setEnableTutorial] = useState(() => {
    return localStorage.getItem("tutorialShown") !== "true";
  });

  const handleCloseTutorial = () => {
    localStorage.setItem("tutorialShown", "true");
    setEnableTutorial(false);
  };

  useEffect(() => {
    const musicArr = ["battle1", "battle2", "battle3"];
    AudioManager.playBgm(musicArr[Math.floor(Math.random() * 3)]);
  }, [curLevel, gameState]);

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
        [selectedSetId]: {
          ...prev[selectedSetId],
          distribution: levelDistribution,
          curLevel: curLevel,
        },
      }));
    }
    fetchCards();
  }, [collectedCards, gameState, curLevel, selectedSetId]);

  // things to do when player win the round
  useEffect(() => {
    console.log(clickedCards);
    if (
      clickedCards.length === selectedCards.length &&
      selectedCards.length > 0
    ) {
      console.log(isInEndless);

      if (!isInEndless) {
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
          [selectedSetId]: {
            ...prev[selectedSetId],
            curLevel: prev[selectedSetId].curLevel + 1,
          },
        }));
      } else {
        setGameState(() => "win");
        setGameInfo((prev) => ({
          ...prev,
          [selectedSetId]: {
            ...prev[selectedSetId],
            endlessRound: prev[selectedSetId].endlessRound + 1,
            endlessScore: prev[selectedSetId].endlessRound,
            endlessHighScore: Math.max(
              prev[selectedSetId].endlessHighScore,
              prev[selectedSetId].endlessRound
            ),
          },
        }));
      }
    }
  }, [
    clickedCards,
    selectedCards,
    selectedSet,
    setCollectedCards,
    selectedSetId,
    isInEndless,
  ]);

  // for localstorage

  useEffect(() => {
    localStorage.setItem(
      "tcg-memo-collectedCards",
      JSON.stringify(collectedCards)
    );
  }, [collectedCards]);
  useEffect(() => {
    localStorage.setItem("tcg-memo-gameInfo", JSON.stringify(gameInfo));
  }, [gameInfo]);

  //   for endless mode
  useEffect(() => {
    if (gameState === "endless-restart") {
      async function fetchCards() {
        const url = `data/cards/${selectedSetId}.json`;
        const response = await fetch(url);
        const cards = await response.json();

        const randomN = getRandomElements(cards, endlessLevel);
        setSelectedCards(randomN);
        setLengthOfSet(() => cards.length);
        setGameInfo((prev) => ({
          ...prev,
          [selectedSetId]: {
            ...prev[selectedSetId],
            endlessRound: 1,
            endlessScore: 0,
          },
        }));
      }
      fetchCards();
    }
    if (gameState === "endless-over") {
      setGameInfo((prev) => ({
        ...prev,
        [selectedSetId]: {
          ...prev[selectedSetId],
          endlessRound: 1,
          endlessScore: 0,
        },
      }));
      setTimeout(() => {
        setPage(() => "gameSelect");
      }, 10);
    }
    if (gameState === "endless") {
      console.log("in endless");
      async function fetchCards() {
        const url = `data/cards/${selectedSetId}.json`;
        const response = await fetch(url);
        const cards = await response.json();

        const randomN = getRandomElements(cards, endlessLevel);
        setSelectedCards(randomN);
        setLengthOfSet(() => cards.length);
        setGameInfo((prev) => ({
          ...prev,
          [selectedSetId]: {
            ...prev[selectedSetId],
            endlessRound: endlessLevel,
            endlessHighScore: endlessHighScore,
            endlessScore: endlessScore,
          },
        }));
      }
      fetchCards();
    }
  }, [
    gameState,
    endlessLevel,
    selectedSetId,
    endlessHighScore,
    endlessScore,
    setPage,
  ]);

  // for 100% a set
  useEffect(() => {
    if (collectedCards[selectedSet.id].length === lengthOfSet) {
      setGameState("setCollected");
      //   setGameInfo((prev) => ({
      //     ...prev,
      //     [selectedSetId]: {
      //       ...prev[selectedSetId],
      //       endlessRound: 1,
      //     },
      //   }));
    }
  }, [collectedCards, lengthOfSet, selectedSet, selectedSetId]);

  // to modify popup windows

  let popUpWindow;
  switch (gameState) {
    case "over":
      popUpWindow = (
        <PopupWindow
          setGameState={setGameState}
          setPage={setPage}
          setClickedCards={setClickedCards}
          isInEndless={isInEndless}
          endlessLevel={endlessLevel}
          type="gameOver"
        />
      );
      break;
    case "win":
      popUpWindow = (
        <PopupWindow
          setGameState={setGameState}
          setPage={setPage}
          setClickedCards={setClickedCards}
          isInEndless={isInEndless}
          gameInfo={gameInfo[selectedSetId]}
          type="win"
        />
      );
      break;
    case "setCollected":
      popUpWindow = (
        <PopupWindow
          setGameState={setGameState}
          setPage={setPage}
          setClickedCards={setClickedCards}
          gameInfo={gameInfo[selectedSetId]}
          type="fullCollection"
        ></PopupWindow>
      );
      break;
    default:
      popUpWindow = null;
  }

  return (
    <div className="game-wrap">
      {enableTutorial && (
        <div
          className="fixed inset-0 z-100 bg-black/30 backdrop-blur-sm flex justify-center items-center"
          onClick={handleCloseTutorial}
        >
          <div
            className="flex flex-col gap-2 bg-white/95 p-4 text-center"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside box
          >
            <p>How to Play</p>
            <hr />
            <p>Click each card only once — no repeats!</p>
            <p>Complete the round to add cards to your collection!</p>
          </div>
        </div>
      )}
      <div className={`${enableTutorial ? "pointer-events-none" : ""}`}>
        {popUpWindow}
        {gameState === "playing" && (
          <p className="text-center">
            {selectedSet.name} - level {gameInfo[selectedSetId]?.curLevel + 1}
          </p>
        )}
        {gameState === "playing" && (
          <p className="text-center">
            Cards remaining:{" "}
            {gameInfo[selectedSetId]?.distribution[
              gameInfo[selectedSetId]?.curLevel
            ] - clickedCards.length}
          </p>
        )}
        {(gameState === "endless" || gameState === "endless-restart") && (
          <div className="endless-wrap">
            <div className="endless-info-wrap">
              <p>{selectedSet.name} - Endless Mode</p>
              <p>Round: {gameInfo[selectedSetId]?.endlessRound}</p>
            </div>
            <p>Score: {gameInfo[selectedSetId]?.endlessScore}</p>
            <p>High Score: {gameInfo[selectedSetId]?.endlessHighScore}</p>
          </div>
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
              isInEndless={isInEndless}
              flipped={flipped}
              setFlipped={setFlipped}
            ></InGameCard>
          ))}
        </div>
      </div>
    </div>
  );
}
