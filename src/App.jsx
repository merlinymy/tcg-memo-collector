// src/App.jsx
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Collections } from "./components/Collections";
import { StartingPage } from "./components/StartingPage";
import { GameSelect } from "./components/GameSelect";
import { TopBar } from "./components/TopBar";
import { Game } from "./components/Game";
import { getOrInitializeLocalStorage } from "./utils";
import { EntryPage } from "./components/EntryPage";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const localCollectedCards = getOrInitializeLocalStorage(
    "tcg-memo-collectedCards",
    {}
  );

  const [page, setPage] = useState("entry");
  const [selectedSet, setSelectedSet] = useState({});
  const [collectedCards, setCollectedCards] = useState(
    () => localCollectedCards
  );

  let component;
  switch (page) {
    case "entry":
      component = <EntryPage setPage={setPage} />;
      break;
    case "starting":
      component = <StartingPage setPage={setPage} />;
      break;
    case "collections":
      component = (
        <Collections
          type="sets"
          setPage={setPage}
          setSelectedSet={setSelectedSet}
          set={selectedSet}
          isInCollection={true}
          collectedCards={collectedCards}
          page={page}
        >
          <TopBar
            setPage={setPage}
            prevPage="starting"
            isInGameSelect={false}
          />
        </Collections>
      );
      break;
    case "gameSelect":
      component = (
        <GameSelect
          setPage={setPage}
          setSelectedSet={setSelectedSet}
          set={selectedSet}
          collectedCards={collectedCards}
        >
          <TopBar setPage={setPage} prevPage="starting" isInGameSelect={true} />
        </GameSelect>
      );
      break;
    case "game":
      // ensure an array exists for this set before rendering <Game>
      if (collectedCards[selectedSet.id] === undefined) {
        setCollectedCards((prev) => ({ ...prev, [selectedSet.id]: [] }));
        return null; // render nothing this tick
      }
      component = (
        <Game
          setPage={setPage}
          selectedSet={selectedSet}
          collectedCards={collectedCards}
          setCollectedCards={setCollectedCards}
        />
      );
      break;
    case "cards":
      component = (
        <Collections
          type="cards"
          set={selectedSet}
          setPage={setPage}
          setSelectedSet={setSelectedSet}
          isInCollection={true}
          collectedCards={collectedCards}
          page={page}
        >
          <TopBar prevPage="collections" setPage={setPage} />
        </Collections>
      );
      break;
    default:
      return null;
  }
  return (
    <div>
      {component}
      <SpeedInsights />
      <Analytics />
    </div>
  );
}

export default App;
