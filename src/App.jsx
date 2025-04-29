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

/* ─────────────────────────────────────────────────────────── */

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

  const musicRef = useRef(null); // created (and unlocked) in EntryPage
  const lastTrackRef = useRef(""); // remembers what’s currently playing

  const [gameTrackIdx, setGameTrackIdx] = useState(() =>
    Math.floor(Math.random() * battleTracks.length)
  );

  /* ---------- helpers ---------- */
  // volume is read-only on iOS; this regex + touch check covers iPhone/iPad
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  /* ---------- track switch / cross-fade ---------- */
  useEffect(() => {
    if (!musicRef.current) return; // not yet unlocked on first load

    const audio = musicRef.current;
    audio.loop = true;

    // pick track for the current page
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

    // already playing this track?
    if (musicSrc === lastTrackRef.current) return;
    lastTrackRef.current = musicSrc;

    /* ========== iOS (no JS volume control) ========== */
    if (isIOS) {
      audio.pause();
      audio.src = musicSrc;
      audio.play().catch(() => {});
      return; // nothing to clean up
    }

    /* ========== desktop / Android cross-fade ========== */
    const step = 0.05;
    const interval = 40; // ms  (≈0.8 s total fade)

    const fadeOut = setInterval(() => {
      audio.volume = Math.max(0, audio.volume - step);
      if (audio.volume === 0) {
        clearInterval(fadeOut);
        audio.pause();
        audio.currentTime = 0;

        audio.src = musicSrc;
        audio.volume = 0;
        audio.play().then(() => {
          const fadeIn = setInterval(() => {
            audio.volume = Math.min(1, audio.volume + step);
            if (audio.volume === 1) clearInterval(fadeIn);
          }, interval);
        });
      }
    }, interval);

    // if the user changes page again mid-fade, stop the current timer
    return () => clearInterval(fadeOut);
  }, [page, gameTrackIdx, battleTracks, isIOS]); // runs whenever page or battle track index changes

  let component;
  switch (page) {
    case "entry":
      component = (
        <EntryPage
          setPage={setPage}
          musicRef={musicRef} // creates + unlocks <audio> on first tap
        />
      );
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
          randomizeMusic={() =>
            setGameTrackIdx(Math.floor(Math.random() * battleTracks.length))
          }
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
    </div>
  );
}

export default App;
