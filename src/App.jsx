import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Collections } from "./components/Collections";
import { StartingPage } from "./components/StartingPage";
import { GameSelect } from "./components/GameSelect";
import { TopBar } from "./components/TopBar";
import { Game } from "./components/Game";
import { getOrInitializeLocalStorage } from "./utils";
import { EntryPage } from "./components/EntryPage";

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

  const musicRef = useRef(new Audio());

  useEffect(() => {
    const audio = musicRef.current;
    audio.loop = true;
    let musicSrc = "";
    switch (page) {
      case "starting":
        musicSrc = "/music/pocketMenu.mp3";
        break;
      case "gameSelect":
        musicSrc = "/music/game-select.mp3";
        break;
      case "collections":
        musicSrc = "/music/collection.mp3";
        break;
      default:
        musicSrc = "";
    }
    // ——— nothing to do if this page has no music ———
    if (!musicSrc) return;
    const fullUrl = window.location.origin + musicSrc;
    if (audio.src === fullUrl) return; // already on this track
    // ——— cross-fade ———
    const step = 0.05; // volume step
    const interval = 40; // ms  (≈ 0.8 s for full fade)
    const fadeOut = setInterval(() => {
      audio.volume = Math.max(0, audio.volume - step);
      if (audio.volume === 0) {
        clearInterval(fadeOut);
        audio.pause();
        audio.currentTime = 0;
        audio.src = musicSrc;
        audio.volume = 0; // start new track silent
        audio
          .play()
          .then(() => {
            const fadeIn = setInterval(() => {
              audio.volume = Math.min(1, audio.volume + step);
              if (audio.volume === 1) clearInterval(fadeIn);
            }, interval);
          })
          .catch((e) => console.log("Autoplay blocked:", e));
      }
    }, interval);
  }, [page]);

  switch (page) {
    case "entry":
      return <EntryPage setPage={setPage} musicRef={musicRef}></EntryPage>;
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
