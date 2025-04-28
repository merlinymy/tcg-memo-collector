import { Button } from "./Button";

export function Win({ setPage, setGameState, setClickedCards }) {
  const backToMenu = () => {
    setPage("starting");
    setClickedCards([]);
  };
  const playAgain = () => {
    setGameState("playing");
    setClickedCards([]);
  };
  const backToSelection = () => {
    setPage("gameSelect");
    setClickedCards([]);
  };
  return (
    <div className="win-popup">
      <p>You collected all the cards from this round!</p>
      <Button handleClick={playAgain}>Next round</Button>
      <Button handleClick={backToSelection}>Go Back</Button>
      <Button handleClick={backToMenu}>Menu</Button>
    </div>
  );
}
