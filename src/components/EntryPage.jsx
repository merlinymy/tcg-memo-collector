import AudioManager from "../audio/AudioManager";
import { useEffect } from "react";
export function EntryPage({ setPage }) {
  useEffect(() => {
    AudioManager.playBgm("menu");
  }, []);

  const start = () => {
    setPage("starting");
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-[100dvh] w-[100dvw]"
      onClick={start}
    >
      <div className="border flex flex-col text-center gap-2 justify-center items-center p-5 mb-5">
        <p>Your progress is saved locally in your browser. </p>
        <p>
          Clearing your browser data or using a different device/browser will
          reset your save.
        </p>
      </div>
      <p className="text-2xl">click to start</p>
    </div>
  );
}
