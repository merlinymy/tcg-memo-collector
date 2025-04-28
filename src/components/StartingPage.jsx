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
    <div className="h-[100dvh] w-[100dvw] flex">
      <Title></Title>
      <div className="btn-wrap absolute top-[80%] left-[50%] transform translate-x-[-50%] translate-y-[-80%]">
        <div className="menu-btns flex flex-col gap-2">
          <Button handleClick={() => startGame()}>Play</Button>
          <Button handleClick={() => openMyCollection()}>My Collection</Button>
        </div>
      </div>
    </div>
  );
}
