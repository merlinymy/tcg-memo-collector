import "../styles/card.css";
import tcg_back from "../assets/img/tcg_back.png";
import AudioManager from "../audio/AudioManager";
import Tilt from "react-parallax-tilt";
import { useEffect, useState } from "react";
export function Card({
  data,
  setPage,
  setSelectedSet,
  isInGame,
  collectedCards,
  prevSetPrecent,
  page,
  selectedSet,
  setLoading,
}) {
  // data is one set or one tcg card
  const openSet = (set) => {
    AudioManager.playSfx("click");
    setLoading(() => true);
    setPage(() => "cards");
    setSelectedSet(() => set);
  };

  const gotoGamePage = (set) => {
    AudioManager.playSfx("click");

    setLoading(true);
    setSelectedSet(() => set);
    setPage(() => "game");
  };
  const setLength = data.total;
  const cards = collectedCards[data.id];
  const cardsNum = cards ? cards.length : 0;
  const percentageCollected = Math.floor((cardsNum / setLength) * 100);
  const greyStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    filter: "grayscale(100%)",
    clipPath: `inset(0 0 0 ${percentageCollected}%)`,
    pointerEvents: "none",
    width: "100%", // Important to maintain full coverage
    height: "auto", // Keep aspect ratio
  };

  const [isEnlarge, setIsEnlarge] = useState(false);
  const [clickTarget, setClickTarget] = useState(null);
  const [oldPos, setOldPos] = useState(null);

  const enlarge = (e) => {
    const target = e.target.parentElement.parentElement;
    setIsEnlarge((prev) => !prev);
    setClickTarget(() => target);
    console.log(target.getBoundingClientRect());
    if (!isEnlarge) {
      setOldPos(() => target.getBoundingClientRect());
    }
  };
  useEffect(() => {
    console.log(clickTarget);

    if (isEnlarge) {
      const rect = clickTarget.getBoundingClientRect();
      console.log(`Top: ${rect.top}px, Left: ${rect.left}px`);
      clickTarget.style.position = "fixed";
      clickTarget.style.top = `${rect.top}px`;
      clickTarget.style.left = `${rect.left}px`;
      clickTarget.style.width = `${rect.width}px`;
      clickTarget.style.height = `${rect.height}px`;
      clickTarget.style.transition = "all 1.5s ease";

      setTimeout(() => {
        clickTarget.style.zIndex = "1001";
        clickTarget.style.top = "50%";
        clickTarget.style.left = "50%";
        clickTarget.style.width = "90%";
        clickTarget.style.maxWidth = "500px";
        clickTarget.style.height = "auto";
        clickTarget.style.transform = "translate(-50%, -50%) rotateY(360deg)";
      }, 0);
    } else if (!isEnlarge && clickTarget) {
      const rect = clickTarget.getBoundingClientRect();
      const oldRect = oldPos;
      clickTarget.style.position = "fixed";
      clickTarget.style.top = `${rect.top}px`;
      clickTarget.style.left = `${rect.left}px`;
      clickTarget.style.width = `${rect.width}px`;
      clickTarget.style.height = `${rect.height}px`;
      clickTarget.style.transition = "all 1.5s ease";
      console.log(oldRect);
      setTimeout(() => {
        clickTarget.style.zIndex = "10";
        clickTarget.style.top = `${oldRect.top}px`;
        clickTarget.style.left = `${oldRect.left}px`;
        clickTarget.style.width = `${oldRect.width}px`;
        clickTarget.style.height = `${oldRect.height}px`;
        clickTarget.style.transform = "none";
      }, 0);
      clickTarget.addEventListener("transitionend", () => {
        clickTarget.style.position = "static";
        console.log("Collapse animation finished, cleaned up styles.");
      });
    }
  }, [isEnlarge, clickTarget, oldPos]);

  if (isInGame) {
    // render sets click to Game component
    if (percentageCollected <= 0 && prevSetPrecent < 75) {
      return (
        <div
          className="card p-3 cursor-default pointer-events-none relative bg-[#6d6d6d]"
          onClick={() => gotoGamePage(data)}
        >
          <div className="flex items-center">
            <img
              className="set-symbol"
              src={data.images.symbol}
              alt="set logo"
            />
            <p className="text-2xl">{data.name}</p>
          </div>
          <div className="image-container">
            <img
              className="set-logo"
              src={data.images.logo}
              alt={`image for tcg set ${data.name}`}
            />
            <img
              className="set-logo grey-image"
              src={data.images.logo}
              alt={`image for tcg set ${data.name}`}
              style={greyStyle}
            />
          </div>
          <p className="text-[white] bg-[black]/75 absolute top-10 z-10 text-2xl text-center">
            Collect 75% of previous set to Unlock
          </p>
        </div>
      );
    }
    return (
      <div
        className="card p-3 cursor-pointer"
        onClick={() => gotoGamePage(data)}
      >
        <div className="flex items-center">
          <img className="set-symbol" src={data.images.symbol} alt="set logo" />
          <p className="text-2xl">{data.name}</p>
        </div>
        <div className="image-container">
          <img
            className="set-logo"
            src={data.images.logo}
            alt={`image for tcg set ${data.name}`}
          />
          <img
            className="set-logo grey-image"
            src={data.images.logo}
            alt={`image for tcg set ${data.name}`}
            style={greyStyle}
          />
        </div>

        <p>
          {cards ? cards.length : 0} / {setLength}
        </p>
        <p>{percentageCollected}% collected</p>
      </div>
    );
  }
  if (data.total) {
    // render sets
    return (
      <div className="card p-3 cursor-pointer" onClick={() => openSet(data)}>
        <div className="flex items-center">
          <img className="set-symbol" src={data.images.symbol} alt="set logo" />
          <p className="text-2xl">{data.name}</p>
        </div>
        <div className="image-container">
          <img
            className="set-logo"
            src={data.images.logo}
            alt={`image for tcg set ${data.name}`}
          />
          <img
            className="set-logo grey-image"
            src={data.images.logo}
            alt={`image for tcg set ${data.name}`}
            style={greyStyle}
          />
        </div>
        <p>
          {cards ? cards.length : 0} / {setLength}
        </p>
        <p>{percentageCollected}% collected</p>
      </div>
    );
  } else {
    //render cards
    return (
      <div
        className={`rounded-[5px] cursor-pointer${
          page !== "cards" ? " p-3" : ""
        }`}
      >
        {collectedCards[selectedSet.id]?.includes(data.id) ? (
          <div
            className="rounded-[5px] bg-[#feffff] h-[100%]  inset-shadow-sm inset-shadow-[grey]"
            onClick={enlarge}
          >
            <div>
              <Tilt
                glareEnable={true}
                glareMaxOpacity={0.75}
                glareColor="white"
                glarePosition="all"
                glareBorderRadius="5px"
                // scale={2}
                transitionSpeed={2500}
              >
                <img
                  className="card-img rounded-[5px] touch-none"
                  src={data.images.large}
                  alt={`image for tcg card ${data.name}`}
                  // onClick={enlarge}
                />
              </Tilt>
              <img
                className="card-img card-img-back rounded-[5px] touch-none"
                src="../assets/img/tcg_back.png"
                alt=""
              />
            </div>
          </div>
        ) : (
          <div className="empty-card bg-[#feffff] h-[100%] cursor-default z-10 inset-shadow-sm inset-shadow-[grey]">
            <div className="relative">
              <img
                className="opacity-0"
                src={tcg_back}
                alt={`image for tcg card ${data.name}`}
              />
              <p className="text-[#a4a4a4] text-5xl absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
                {data.number}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
