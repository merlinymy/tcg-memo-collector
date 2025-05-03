import AudioManager from "../audio/AudioManager";
import { useEffect } from "react";
export function EntryPage({ setPage }) {
  useEffect(() => {
    AudioManager.playBgm("menu");
  }, []);

  const start = () => {
    AudioManager.playSfx("click");
    setPage("starting");
  };

  return (
    <div
      className="flex justify-center items-center h-[100dvh] w-[100dvw]"
      onClick={start}
    >
      <p>click to start</p>
    </div>
  );
}
