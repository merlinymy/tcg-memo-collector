import { Button } from "./Button";

export function GameOver({ setPage, setGameState, setClickedCards }) {
  const backToMenu = () => {
    setPage("starting");
    setClickedCards([]);
  };
  const playAgain = () => {
    setGameState("playing");
    setClickedCards([]);
  };
  return (
    <div>
      <p>You lose, No cards collected</p>
      <Button handleClick={backToMenu}>Menu</Button>
      <Button handleClick={playAgain}>Try Again</Button>
    </div>
  );
}
