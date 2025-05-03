// src/App.jsx
import { useState } from "react";
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
import AudioManager from "./audio/AudioManager";

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

  AudioManager.registerBgm("menu", "/audio/pocketMenu.mp3", 0.05);
  AudioManager.registerBgm("battleMenu", "/audio/battleMenu.mp3", 0.05);
  AudioManager.registerBgm("collection", "/audio/collection.mp3", 0.05);

  AudioManager.registerBgm("battle1", "/audio/battleChance.mp3", 0.05);
  AudioManager.registerBgm("battle2", "/audio/battleNormal.mp3", 0.05);
  AudioManager.registerBgm("battle3", "/audio/battlePinch.mp3", 0.05);
  AudioManager.registerBgm("battleResult", "/audio/battleResult.mp3", 0.05);

  AudioManager.registerSfx("gameWin", "/audio/gamewin.mp3", 0.25);
  AudioManager.registerSfx("gameLose", "/audio/gamelose.mp3", 0.25);

  AudioManager.registerSfx("click", "/audio/menuClick.mp3", 0.2);
  AudioManager.registerSfx("flip", "/audio/cardFlip.mp3", 1);

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
