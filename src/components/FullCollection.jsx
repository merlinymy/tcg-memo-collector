import { Button } from "./Button";
export function FullCollection({
  setPage,
  setGameState,
  setClickedCards,
  gameInfo,
}) {
  const backToMenu = () => {
    setPage("starting");
    setClickedCards([]);
  };
  const startEndless = () => {
    setGameState("endless");
    setClickedCards([]);
  };
  const goToCollection = () => {
    setPage("collections");
    setClickedCards([]);
  };
  const backToSelection = () => {
    setPage("gameSelect");
    setClickedCards([]);
  };
  console.log(gameInfo);
  return (
    <div className="win-popup">
      <p>You have 100% this set!</p>
      <Button handleClick={goToCollection}>My Collection</Button>
      <Button handleClick={startEndless}>
        {gameInfo.endlessScore > 0
          ? "Continue Endless Mode"
          : "New Endless Mode"}
      </Button>
      <Button handleClick={backToSelection}>Go Back</Button>
      <Button handleClick={backToMenu}>Menu</Button>
    </div>
  );
}
