import { Button } from "./Button";
export function FullCollection({ setPage, setGameState, setClickedCards }) {
  const backToMenu = () => {
    setPage("starting");
    setClickedCards([]);
  };
  const startEndless = () => {
    console.log("clicked");
    setGameState("endless");
    setClickedCards([]);
  };
  const goToCollection = () => {
    setPage("collections");
    setClickedCards([]);
  };
  return (
    <div className="win-popup">
      <p>You have 100% this set!</p>
      <Button handleClick={backToMenu}>Menu</Button>
      <Button handleClick={goToCollection}>My Collection</Button>
      <Button disabled={true} handleClick={startEndless}>
        Endless mode
      </Button>
    </div>
  );
}
