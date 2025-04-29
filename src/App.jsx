// App.jsx
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
  /* ---------- persistent data ---------- */
  const localCollectedCards = getOrInitializeLocalStorage(
    "tcg-memo-collectedCards",
    {}
  );

  /* ---------- UI state ---------- */
  const [page, setPage] = useState("entry");
  const [selectedSet, setSelectedSet] = useState({});
  const [collectedCards, setCollectedCards] = useState(
    () => localCollectedCards
  );

  /* ---------- music ---------- */
  const battleTracks = [
    "/music/battleNormal.mp3",
    "/music/battlePinch.mp3",
    "/music/battleChance.mp3",
  ];

  const musicRef = useRef(null); // created later (inside EntryPage tap)
  const [gameTrackIdx, setGameTrackIdx] = useState(() =>
    Math.floor(Math.random() * battleTracks.length)
  );

  /* ----- change / cross-fade track whenever page changes ----- */
  useEffect(() => {
    if (!musicRef.current) return; // not unlocked yet on iOS

    const audio = musicRef.current;
    audio.loop = true;

    let musicSrc = "";
    switch (page) {
      case "starting":
        musicSrc = "/music/pocketMenu.mp3";
        break;
      case "gameSelect":
        musicSrc = "/music/battleMenu.mp3";
        break;
      case "collections":
        musicSrc = "/music/collection.mp3";
        break;
      case "game":
        musicSrc = battleTracks[gameTrackIdx];
        break;
      default:
        musicSrc = "";
    }
    if (!musicSrc) return;

    // use an absolute URL so string compare works on Safari
    const fullUrl = window.location.origin + musicSrc;
    if (audio.src === fullUrl) return; // already on this track

    /* ----- simple cross-fade ----- */
    const step = 0.05;
    const interval = 40; // ms

    const fadeOut = setInterval(() => {
      audio.volume = Math.max(0, audio.volume - step);
      if (audio.volume === 0) {
        clearInterval(fadeOut);
        audio.pause();
        audio.currentTime = 0;

        audio.src = musicSrc;
        audio.volume = 0;
        audio
          .play()
          .then(() => {
            const fadeIn = setInterval(() => {
              audio.volume = Math.min(1, audio.volume + step);
              if (audio.volume === 1) clearInterval(fadeIn);
            }, interval);
          })
          .catch((e) => console.log("autoplay blocked:", e));
      }
    }, interval);

    return () => clearInterval(fadeOut);
  }, [page, gameTrackIdx, battleTracks]);

  /* ---------- JSX routing ---------- */
  switch (page) {
    case "entry":
      return (
        <EntryPage
          setPage={setPage}
          musicRef={musicRef} // ⬅️ first tap creates & unlocks Audio
        />
      );

    case "starting":
      return <StartingPage setPage={setPage} />;

    case "collections":
      return (
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

    case "gameSelect":
      return (
        <GameSelect
          setPage={setPage}
          setSelectedSet={setSelectedSet}
          set={selectedSet}
          collectedCards={collectedCards}
        >
          <TopBar setPage={setPage} prevPage="starting" isInGameSelect={true} />
        </GameSelect>
      );

    case "game":
      /* ensure each set has an entry in collectedCards */
      if (collectedCards[selectedSet.id] === undefined) {
        setCollectedCards((prev) => ({ ...prev, [selectedSet.id]: [] }));
        return null; // wait for next render
      }
      return (
        <Game
          setPage={setPage}
          selectedSet={selectedSet}
          collectedCards={collectedCards}
          setCollectedCards={setCollectedCards}
          randomizeMusic={() =>
            setGameTrackIdx(Math.floor(Math.random() * battleTracks.length))
          }
        />
      );

    case "cards":
      return (
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

    default:
      return null;
  }
}

export default App;