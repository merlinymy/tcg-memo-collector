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
  const openSet = (set) => {
    setSelectedSet(() => set);

    setPage(() => "cards");
  };

  const gotoGamePage = (set) => {
    setSelectedSet(() => set);
    setPage(() => "game");
  };

  if (isInGame) {
    // render sets click to Game component
    return (
      <div className="card p-3" onClick={() => gotoGamePage(data)}>
        <div className="flex items-center">
          <img className="set-symbol" src={data.images.symbol} alt="set logo" />
          <p className="text-2xl">{data.name}</p>
        </div>
        <img
          className="set-logo"
          src={data.images.logo}
          alt={`image for tcg set ${data.name}`}
        />
        <p>
          {collectedCards[data.id] ? collectedCards[data.id].length : 0} /{" "}
          {data.total}
        </p>
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
        <img
          className="set-logo"
          src={data.images.logo}
          alt={`image for tcg set ${data.name}`}
        />
        <p>
          {collectedCards[data.id] ? collectedCards[data.id].length : 0} /{" "}
          {data.total}
        </p>{" "}
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
