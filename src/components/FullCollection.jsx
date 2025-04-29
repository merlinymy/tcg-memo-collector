import { Button } from "./Button";
export function FullCollection({ setPage, setGameState, setClickedCards }) {
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
  return (
    <div className="win-popup">
      <p>You have 100% this set!</p>
      <Button handleClick={goToCollection}>My Collection</Button>
      <Button handleClick={startEndless}>Endless mode</Button>
      <Button handleClick={backToSelection}>Go Back</Button>
      <Button handleClick={backToMenu}>Menu</Button>
    </div>
  );
}
