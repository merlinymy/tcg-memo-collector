import { Button } from "./Button";

export function GameOver({
  setPage,
  setGameState,
  setClickedCards,
  isInEndless,
  endlessLevel,
}) {
  const backToMenu = () => {
    setPage("starting");
    setClickedCards([]);
  };
  const playAgain = () => {
    if (isInEndless) {
      setGameState("endless-restart");
    } else {
      setGameState("playing");
    }
    setClickedCards([]);
  };
  const backToSelection = () => {
    if (isInEndless) {
      setGameState("endless-over");
    } else {
      setPage(() => "gameSelect");
    }
    setClickedCards([]);
  };
  return (
    <div>
      {!isInEndless && (
        <div>
          <p>No cards collected this time</p>{" "}
          <p> Insert memory to continue...</p>
        </div>
      )}
      {isInEndless && <p>Game Over! You reached Round {endlessLevel - 1}</p>}
      <Button handleClick={playAgain}>Try Again</Button>
      <Button handleClick={backToSelection}>Go Back</Button>
      <Button handleClick={backToMenu}>Menu</Button>
    </div>
  );
}
