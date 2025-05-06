import { Button } from "./Button";
import { Title } from "./Title";
import { useEffect, useState } from "react";
import AudioManager from "../audio/AudioManager";
import Tilt from "react-parallax-tilt";
import { Loading } from "./Loading";
import { SettingsPopup } from "./SettingsPopup";

export function StartingPage({ setPage }) {
  const [randomCards, setRandomCards] = useState([]);

  // for loading
  const [loaded, setLoaded] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const total = randomCards.length || 1;
  const percent = Math.round((loaded / total) * 100);

  const randomSets = async () => {
    async function getOneRandomFromEachCardFile(ids) {
      const promises = ids.map(async (id) => {
        const res = await fetch(`/data/cards/${id}.json`);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const randomElement = data[Math.floor(Math.random() * data.length)];
          return randomElement;
        } else {
          console.warn(`File /data/cards/${id}.json is empty or invalid`);
          return null;
        }
      });

      const results = await Promise.all(promises);
      return results.filter((item) => item !== null);
    }

    const sets = await fetch("/data/sets.json");
    const data = await sets.json();
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    const setIds = shuffled.slice(0, 20).map((ele) => ele.id);

    const cards = await getOneRandomFromEachCardFile(setIds);
    setRandomCards(cards);
  };

  useEffect(() => {
    AudioManager.playBgm("menu");
    randomSets();
  }, []);

  const startGame = () => {
    setPage("gameSelect");
  };

  const openMyCollection = () => {
    setPage("collections");
  };

  const openSettings = () => {
    setSettingsOpen(true);
  };

  const closeSettings = () => {
    setSettingsOpen(false);
  };

  // Settings for random size scaling
  const minScale = 0.8; // 60% of base size
  const maxScale = 1.2; // 100% of base size

  return (
    <div className=" h-[100dvh] w-[100dvw] flex flex-col items-center justify-center relative overflow-hidden">
      {loaded < total && <Loading percent={percent} />}

      {/* Grid of cards */}
      <div className="grid grid-cols-4 touch-none md:grid-cols-6">
        {randomCards.map((card) => {
          const randomScale = Math.random() * (maxScale - minScale) + minScale;
          const randomDegZ = Math.random() * 10 - 5;
          const randomDegY = Math.random() * 20 - 10;

          return (
            <Tilt
              key={card.id}
              className="background-stripes track-on-window"
              perspective={500}
              glareEnable={true}
              glareMaxOpacity={0.35}
              glarePosition="all"
              trackOnWindow={true}
              reset={false}
              tiltReverse={true}
              glareReverse={true}
              glareBorderRadius="20px"
            >
              <img
                key={card.id}
                src={card.images.large}
                alt={card.name}
                onLoad={() => setLoaded((c) => c + 1)} // <- new
                onError={() => setLoaded((c) => c + 1)} // <- count failures too
                style={{
                  // transform: `scale(${randomScale}) rotateZ(${randomDegZ}deg) rotateY(${randomDegY}deg)`,
                  transition: "transform 0.5s ease",
                  width: "100%",
                  height: "auto",
                }}
                className="pointer-events-none rounded shadow"
              />
            </Tilt>
          );
        })}
      </div>

      <Title />

      <div className="p-5 btn-wrap w-100 absolute bottom-30 left-1/2 transform -translate-x-1/2 bg-[white]/80">
        <div className="menu-btns flex flex-col gap-2">
          <Button handleClick={startGame}>
            <div className="flex items-center justify-center gap-2">
              <span class="material-symbols-outlined">playing_cards</span>
              Play
            </div>
          </Button>
          <Button handleClick={openMyCollection}>
            <div className="flex items-center justify-center gap-2">
              <span class="material-symbols-outlined">book_5</span>
              Collections
            </div>
          </Button>
          <Button handleClick={openSettings}>
            <div className="flex items-center justify-center gap-2">
              <span class="material-symbols-outlined">settings</span>
              Settings
            </div>
          </Button>
        </div>
      </div>
      {settingsOpen && <SettingsPopup onClose={closeSettings} />}
    </div>
  );
}
