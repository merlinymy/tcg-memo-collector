import AudioManager from "../audio/AudioManager";
import { getRandomElements } from "../utils";
import Tilt from "react-parallax-tilt";

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
    } else {
      AudioManager.playSfx("flip");
      setClickedCards((prev) => [...prev, card.id]);

      setSelectedCards((prev) => getRandomElements(prev, prev.length));
    }
  };
  const isDisabled = gameState === "win" || gameState === "over" ? true : false;
  const disabledStyle = isDisabled
    ? { pointerEvents: "none" }
    : { cursor: "pointer" };
  return (
    <div
      style={disabledStyle}
      className="rounded-[5px] m-1.5"
      onClick={handleClick}
    >
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.75}
        glareColor="white"
        glarePosition="all"
        glareBorderRadius="5px"
      >
        <img
          className="card-img rounded-[5px]"
          src={card.images.large}
          alt={`image for tcg card ${card.name}`}
        />
      </Tilt>
    </div>
  );
}
