import { useEffect } from "react";
import { Button } from "./Button";
import AudioManager from "../audio/AudioManager";

/**
 * PopupWindow
 * -------------------------------------------------------------------
 *  type:          "win" | "gameOver" | "fullCollection"
 * setPage:          (pageName) => void
 * setGameState:     (stateName) => void
 * setClickedCards:  ([]) => void
 * isInEndless:      boolean                     // win & gameOver
 * endlessLevel:     number                      // gameOver
 * gameInfo:         { endlessScore: number }    // win & fullCollection
 */
export function PopupWindow({
  type,
  setPage,
  setGameState,
  setClickedCards,
  isInEndless = false,
  endlessLevel = 1,
  gameInfo = { endlessScore: 0 },
}) {
  useEffect(() => {
    AudioManager.playBgm("battleResult");
  });

  const resetClicks = () => setClickedCards([]);

  const backToMenu = () => {
    setPage("starting");
    resetClicks();
  };

  const backToSelection = () => {
    if (type === "gameOver" && isInEndless) {
      setGameState("endless-over");
    } else {
      setPage("gameSelect");
    }
    resetClicks();
  };

  const playAgain = () => {
    if (type === "gameOver") {
      // restart
      setGameState(isInEndless ? "endless-restart" : "playing");
    } else if (type === "win") {
      // next round
      setGameState(isInEndless ? "endless" : "playing");
    }
    resetClicks();
  };

  /* ----------  type‑specific handlers ---------- */
  const startEndless = () => {
    setGameState("endless");
    resetClicks();
  };

  const goToCollection = () => {
    setPage("collections");
    resetClicks();
  };
  /* ----------  type‑specific markup ---------- */
  let body = null;
  let buttons = null;

  switch (type) {
    case "win":
      AudioManager.playSfx("gameWin");
      body = (
        <p>
          {isInEndless
            ? "Round cleared! Get ready for the next challenge!"
            : "You collected all the cards from this round!"}
        </p>
      );
      buttons = (
        <>
          <Button handleClick={playAgain}>Next Round</Button>
          <Button handleClick={backToSelection}>
            {gameInfo.endlessScore > 0 ? "Save & Go Back" : "Go Back"}
          </Button>
        </>
      );
      break;

    case "gameOver":
      AudioManager.playSfx("gameLose");

      body = isInEndless ? (
        <p>Game Over! You reached Round {endlessLevel - 1}</p>
      ) : (
        <>
          <p>No cards collected this time</p>
          <p>Insert memory to continue…</p>
        </>
      );
      buttons = (
        <>
          <Button handleClick={playAgain}>Try Again</Button>
          <Button handleClick={backToSelection}>Go Back</Button>
        </>
      );
      break;

    case "fullCollection":
      body = <p>You have 100% this set!</p>;
      buttons = (
        <>
          <Button handleClick={goToCollection}>My Collection</Button>
          <Button handleClick={startEndless}>
            {gameInfo.endlessScore > 0
              ? "Continue Endless Mode"
              : "New Endless Mode"}
          </Button>
          <Button handleClick={backToSelection}>Go Back</Button>
        </>
      );
      break;

    default:
      body = null;
  }

  /* ---------- render ---------- */
  return (
    <div className="popup fixed flex flex-col gap-2 bg-[white]/40 backdrop-blur-sm p-4 text-center top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-100">
      {body}
      {buttons}
      <Button handleClick={goToCollection}>Collections</Button>
      <Button handleClick={backToMenu}>Menu</Button>
    </div>
  );
}
