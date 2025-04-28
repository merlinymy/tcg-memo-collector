import { getRandomElements } from "../utils";

export function InGameCard({
  card,
  clickedCards,
  setClickedCards,
  setSelectedCards,
  setGameState,
  gameState,
}) {
  const handleClick = function () {
    if (clickedCards.includes(card.id)) {
      setGameState("over");
    }
    setClickedCards((prev) => [...prev, card.id]);

    setSelectedCards((prev) => getRandomElements(prev, prev.length));
  };
  const isDisabled = gameState === "win" || gameState === "over" ? true : false;
  const disabledStyle = isDisabled
    ? { pointerEvents: "none" }
    : { cursor: "pointer" };
  return (
    <div
      style={disabledStyle}
      className="rounded-[5px] overflow-hidden m-1.5"
      onClick={handleClick}
    >
      <img
        className="card-img"
        src={card.images.large}
        alt={`image for tcg card ${card.name}`}
      />
    </div>
  );
}
