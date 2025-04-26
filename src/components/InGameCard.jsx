import { getRandomElements } from "../utils";

export function InGameCard({
  card,
  clickedCards,
  setClickedCards,
  setSelectedCards,
  setGameState,
}) {
  const handleClick = function () {
    if (clickedCards.includes(card.id)) {
      setGameState("over");
    }
    setClickedCards((prev) => [...prev, card.id]);

    setSelectedCards((prev) => getRandomElements(prev, prev.length));
  };
  return (
    <div className="rounded-2xl p-3 overflow-hidden" onClick={handleClick}>
      <img
        className="card-img"
        src={card.images.large}
        alt={`image for tcg card ${card.name}`}
      />
    </div>
  );
}
