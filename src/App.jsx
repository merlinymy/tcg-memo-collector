import { useState } from "react";
import "./App.css";
import { Collections } from "./components/Collections";
import { StartingPage } from "./components/StartingPage";
import { GameSelect } from "./components/GameSelect";
import { TopBar } from "./components/TopBar";
import { Game } from "./components/Game";

function App() {
  const localCollectedCards = JSON.parse(
    localStorage.getItem("tcg-memo-collectedCards")
  );
  if (!localCollectedCards) {
    localStorage.setItem("tcg-memo-collectedCards", JSON.stringify({}));
  }
  const [page, setPage] = useState("starting");
  const [selectedSet, setSelectedSet] = useState({});
  const [collectedCards, setCollectedCards] = useState(() => {
    return JSON.parse(localStorage.getItem("tcg-memo-collectedCards"));
  });

  switch (page) {
    case "starting":
      return <StartingPage setPage={setPage}></StartingPage>;
    case "collections":
      return (
        <Collections
          type={"sets"}
          setPage={setPage}
          setSelectedSet={setSelectedSet}
          set={selectedSet}
          isInCollection={true}
          collectedCards={collectedCards}
          page={page}
        >
          <TopBar
            setPage={setPage}
            prevPage={"starting"}
            isInGameSelect={false}
          ></TopBar>
        </Collections>
      );
    case "gameSelect":
      return (
        <GameSelect
          setPage={setPage}
          setSelectedSet={setSelectedSet}
          set={selectedSet}
          collectedCards={collectedCards}
        >
          <TopBar
            setPage={setPage}
            prevPage={"starting"}
            isInGameSelect={true}
          ></TopBar>
        </GameSelect>
      );
    case "game":
      if (collectedCards[selectedSet.id] === undefined) {
        setCollectedCards((prev) => ({ ...prev, [selectedSet.id]: [] }));
        return null; // wait until next render after state is ready
      }
      return (
        <Game
          setPage={setPage}
          selectedSet={selectedSet}
          collectedCards={collectedCards}
          setCollectedCards={setCollectedCards}
        ></Game>
      );
    case "cards":
      return (
        <Collections
          type={"cards"}
          set={selectedSet}
          setPage={setPage}
          setSelectedSet={setSelectedSet}
          isInCollection={true}
          collectedCards={collectedCards}
          page={page}
        >
          <TopBar
            prevPage={"collections"}
            setPage={setPage}
            isInGameSelect={false}
          ></TopBar>
        </Collections>
      );
  }
}

export default App;
