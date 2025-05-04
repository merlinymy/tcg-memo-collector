import { useState } from "react";
import { Button } from "./Button";
import AudioManager from "../audio/AudioManager";

export function SettingsPopup({ onClose }) {
  const [bgmVolume, setBgmVolume] = useState(AudioManager.bgmVolume);
  const [sfxVolume, setSfxVolume] = useState(AudioManager.sfxVolume);
  const [bgmMuted, setBgmMuted] = useState(AudioManager.bgmMuted);
  const [sfxMuted, setSfxMuted] = useState(AudioManager.sfxMuted);

  const handleBgmVol = (e) => {
    const v = parseFloat(e.target.value);
    setBgmVolume(v);
    AudioManager.setBgmVolume(v);
  };
  const handleSfxVol = (e) => {
    const v = parseFloat(e.target.value);
    setSfxVolume(v);
    AudioManager.setSfxVolume(v);
  };
  const toggleBgm = () => {
    AudioManager.toggleBgmMute();
    setBgmMuted(AudioManager.bgmMuted);
  };
  const toggleSfx = () => {
    AudioManager.toggleSfxMute();
    setSfxMuted(AudioManager.sfxMuted);
  };

  const [confirmClear, setConfirmClear] = useState(false);
  const askClear = () => setConfirmClear(true);
  const cancelClear = () => setConfirmClear(false);
  const confirmAndClear = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      {confirmClear ? (
        <div
          className="popup fixed flex flex-col gap-2 bg-[white]/40 backdrop-blur-sm p-4 text-center
                        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100]"
        >
          <p className="text-red-600 font-bold">
            Warning: This will reset all your game progress. Use this if you see
            NaN anywhere.
          </p>
          <Button handleClick={confirmAndClear}>Yes, Clear Data</Button>
          <Button handleClick={cancelClear}>Cancel</Button>
        </div>
      ) : (
        <div
          className="popup fixed flex flex-col gap-4 bg-[white]/40 backdrop-blur-sm p-4 text-center
                        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100]"
        >
          <div className="flex flex-col gap-1">
            <span className="font-bold">Music</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={bgmVolume}
              onChange={handleBgmVol}
              disabled={bgmMuted}
            />
            <Button handleClick={toggleBgm}>
              {bgmMuted ? "Un‑mute" : "Mute"}
            </Button>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-bold">SFX</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={sfxVolume}
              onChange={handleSfxVol}
              disabled={sfxMuted}
            />
            <Button handleClick={toggleSfx}>
              {sfxMuted ? "Un‑mute" : "Mute"}
            </Button>
          </div>

          <Button handleClick={askClear}>Clear Game Data</Button>
          <Button handleClick={onClose}>Close</Button>
        </div>
      )}
    </>
  );
}
