import "../styles/card.css";
import { Collections } from "./Collections";
import { TopBar } from "./TopBar";
export function Card({
  data,
  setPage,
  setSelectedSet,
  isInGame,
  collectedCards,
}) {
  // data is one set or one tcg card
  const openSet = (set) => {
    setSelectedSet(() => set);

    setPage(() => "cards");
  };

  const gotoGamePage = (set) => {
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

  if (isInGame) {
    // render sets click to Game component

    return (
      <div className="card p-3" onClick={() => gotoGamePage(data)}>
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
      <div className="card p-3" onClick={() => openSet(data)}>
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
      <div className="rounded-2xl p-3 overflow-hidden">
        <img
          className="card-img"
          src={data.images.large}
          alt={`image for tcg card ${data.name}`}
        />
      </div>
    );
  }
}
