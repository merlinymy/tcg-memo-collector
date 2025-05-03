import { Collections } from "./Collections";

export function GameSelect({
  children,
  setPage,
  setSelectedSet,
  set,
  collectedCards,
}) {
  console.log("render - select");
  return (
    <div className="level-wrap relative">
      {children}
      <Collections
        type={"sets"}
        setPage={setPage}
        isInCollection={false}
        setSelectedSet={setSelectedSet}
        set={set}
        collectedCards={collectedCards}
      ></Collections>
    </div>
  );
}
