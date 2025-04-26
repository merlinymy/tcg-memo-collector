import { useState } from "react";
import "./App.css";
import { Collections } from "./components/Collections";
import { StartingPage } from "./components/StartingPage";
import { GameSelect } from "./components/GameSelect";
import { TopBar } from "./components/TopBar";
import { Game } from "./components/Game";

function App() {
  const [page, setPage] = useState("starting");
  const [selectedSet, setSelectedSet] = useState({});
  const [collectedCards, setCollectedCards] = useState({});

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
        >
          <TopBar
            setPage={setPage}
            prevPage={"starting"}
            isInGameSelect={true}
          ></TopBar>
        </GameSelect>
      );
    case "game":
      console.log(selectedSet);
      if (collectedCards[selectedSet] === undefined) {
        setCollectedCards((prev) => ({ ...prev, [selectedSet]: [] }));
        return null; // wait until next render after state is ready
      }
      return (
        <Game
          setPage={setPage}
          selectedSet={selectedSet}
          collectedCards={collectedCards}
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
