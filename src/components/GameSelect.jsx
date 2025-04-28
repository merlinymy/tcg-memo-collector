import { Collections } from "./Collections";

export function GameSelect({
  children,
  setPage,
  setSelectedSet,
  set,
  collectedCards,
}) {
  return (
    <>
      {children}
      <p>Select a set</p>
      <Collections
        type={"sets"}
        setPage={setPage}
        isInCollection={false}
        setSelectedSet={setSelectedSet}
        set={set}
        collectedCards={collectedCards}
      ></Collections>
    </>
  );
}
