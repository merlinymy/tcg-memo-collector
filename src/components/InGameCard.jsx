import AudioManager from "../audio/AudioManager";
import { getRandomElements } from "../utils";
import tcg_back from "../assets/img/tcg_back.png";
import Tilt from "react-parallax-tilt";
export function InGameCard({
  card,
  clickedCards,
  setClickedCards,
  setSelectedCards,
  setGameState,
  gameState,
  flipped, // global flip state
  setFlipped,
}) {
  const handleClick = function () {
    if (clickedCards.includes(card.id)) {
      setGameState("over");
    } else {
      AudioManager.playSfx("flip");
      setFlipped((prev) => !prev);
      document.body.style.pointerEvents = "none";
      setTimeout(() => {
        setClickedCards((prev) => [...prev, card.id]);

        setSelectedCards((prev) => getRandomElements(prev, prev.length));
      }, 380);
      setTimeout(() => {
        setFlipped((prev) => !prev);
        document.body.style.pointerEvents = "";
      }, 450);
    }
  };

  const isDisabled = gameState === "win" || gameState === "over";
  const disabledStyle = isDisabled
    ? { pointerEvents: "none" }
    : { cursor: "pointer" };

  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.35}
      glareColor="white"
      glarePosition="all"
      glareBorderRadius="5px"
      // scale={2}
      transitionSpeed={1500}
      tiltReverse={true}
    >
      <div
        style={disabledStyle}
        className={`card-wrap rounded-[5px] m-1.5 w-[160px] h-[220px] ${
          flipped ? "flipped" : ""
        }`}
        onClick={handleClick}
      >
        <div className="card-inner relative w-full h-full">
          <div className="card-front">
            <img
              className="w-full h-full rounded-[5px]"
              src={card.images.large}
              alt={`tcg card ${card.name}`}
            />
          </div>

          <div className="card-back">
            <img
              className="w-full h-full rounded-[5px]"
              src={tcg_back}
              alt={`back of tcg card ${card.name}`}
            />
          </div>
        </div>
      </div>
    </Tilt>
  );
}
