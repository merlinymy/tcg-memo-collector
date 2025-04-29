import "../styles/card.css";
import tcg_back from "../assets/img/tcg_back.png";
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
    setLoading(() => true);
    setPage(() => "cards");
    setSelectedSet(() => set);
  };

  const gotoGamePage = (set) => {
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
        className={`rounded-[5px] overflow-hidden cursor-pointer${
          page !== "cards" ? " p-3" : ""
        }`}
      >
        {collectedCards[selectedSet.id]?.includes(data.id) ? (
          <img
            className="card-img rounded-[5px]"
            src={data.images.large}
            alt={`image for tcg card ${data.name}`}
          />
        ) : (
          <div className="empty-card bg-[#feffff] h-[100%] relative inset-shadow-sm inset-shadow-[grey]">
            <img
              className="card-img opacity-0"
              src={tcg_back}
              alt={`image for tcg card ${data.name}`}
            />
            <p className="text-[#a4a4a4] text-5xl absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
              {data.number}
            </p>
          </div>
        )}
      </div>
    );
  }
}
