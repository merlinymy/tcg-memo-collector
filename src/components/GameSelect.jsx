import { useEffect } from "react";
import { Collections } from "./Collections";
import AudioManager from "../audio/AudioManager";

export function GameSelect({
  children,
  setPage,
  setSelectedSet,
  set,
  collectedCards,
}) {
  useEffect(() => {
    console.log("battleMenu");
    AudioManager.playBgm("battleMenu");
  }, []);
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
