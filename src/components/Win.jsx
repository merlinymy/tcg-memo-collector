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
  return (
    <div className="win-popup">
      <p>You collected all the cards from this round!</p>
      <Button handleClick={backToMenu}>Menu</Button>
      <Button handleClick={playAgain}>Next round</Button>
    </div>
  );
}
