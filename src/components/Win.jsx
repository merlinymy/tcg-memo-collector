import { Button } from "./Button";

export function Win({
  setPage,
  setGameState,
  setClickedCards,
  isInEndless,
  gameInfo,
}) {
  const backToMenu = () => {
    setPage("starting");
    setClickedCards([]);
  };
  const playAgain = () => {
    console.log(isInEndless);
    if (isInEndless !== undefined || isInEndless !== null) {
      setGameState("endless");
    } else {
      setGameState("playing");
    }
    setClickedCards([]);
  };
  const backToSelection = () => {
    setPage("gameSelect");
    setClickedCards([]);
  };
  return (
    <div className="win-popup">
      {isInEndless ? (
        <p>Round cleared! Get ready for the next challenge!</p>
      ) : (
        <p>You collected all the cards from this round!</p>
      )}
      <Button handleClick={playAgain}>Next round</Button>
      <Button handleClick={backToSelection}>
        {" "}
        {gameInfo.endlessScore > 0 ? "Save & Go Back" : "Go Back"}
      </Button>
      <Button handleClick={backToMenu}>Menu</Button>
    </div>
  );
}
