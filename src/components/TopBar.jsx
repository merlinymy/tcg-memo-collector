import { Button } from "./Button";
import { useState } from "react";
import { SettingsPopup } from "./SettingsPopup";
export function TopBar({ setPage }) {
  const gotoPage = (page) => setPage(page);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const openSettings = () => {
    setSettingsOpen(true);
  };

  const closeSettings = () => {
    setSettingsOpen(false);
  };

  return (
    <nav
      className="
    fixed bottom-0 inset-x-0 z-20
    flex items-center justify-center gap-8
    h-14 px-4 
    bg-gradient-to-b from-red-600 to-red-500
    border-t-4 border-yellow-400
    shadow-md shadow-red-700/40
  "
    >
      <Button handleClick={() => gotoPage("starting")}>
        <span class="material-symbols-outlined">home</span>
      </Button>
      <Button handleClick={() => gotoPage("gameSelect")}>
        <span class="material-symbols-outlined">playing_cards</span>
      </Button>
      <Button handleClick={() => gotoPage("collections")}>
        <span class="material-symbols-outlined">book_5</span>
      </Button>
      <Button handleClick={openSettings}>
        <span class="material-symbols-outlined">settings</span>
      </Button>
      {settingsOpen && <SettingsPopup onClose={closeSettings} />}
    </nav>
  );
}
