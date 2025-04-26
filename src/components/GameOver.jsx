import { Button } from "./Button";

export function GameOver({ setPage, setGameState }) {
  const backToMenu = () => {
    setPage("starting");
  };
  const playAgain = () => {
    setGameState("playing");
  };
  return (
    <div>
      <p>You lose, No cards collected</p>
      <Button handleClick={backToMenu}>Menu</Button>
      <Button handleClick={playAgain}>Try Again</Button>
    </div>
  );
}
