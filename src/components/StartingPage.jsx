import { Button } from "./Button";
import { Title } from "./Title";

export function StartingPage({ setPage }) {
  const startGame = function () {
    setPage("gameSelect");
  };

  const openMyCollection = function () {
    setPage("collections");
  };
  return (
    <div className="">
      <Title></Title>
      <div className="menu-btns">
        <Button handleClick={() => startGame()}>Play</Button>
        <Button handleClick={() => openMyCollection()}>My Collection</Button>
      </div>
    </div>
  );
}
