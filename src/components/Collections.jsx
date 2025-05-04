import { useEffect, useState } from "react";
import { Card } from "./Card";
import { TopBar } from "./TopBar";
import AudioManager from "../audio/AudioManager";

export function Collections({
  type,
  children,
  setPage,
  setSelectedSet,
  set,
  isInCollection,
  collectedCards,
  page,
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AudioManager.playBgm("collection");
  }, [type]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        let url;
        type === "sets"
          ? (url = "data/sets.json")
          : (url = `data/cards/${set.id}.json`);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [type, set]);

  if (loading) {
    return;
  } else {
    return isInCollection ? (
      page === "collections" ? (
        <div className="relative ">
          <div
            className="fixed inset-0 pointer-events-none
                  [background-image:url('../src/assets/img/pokeball-bg.svg')]
                  bg-cover
                  opacity-10 mix-blend-mutply"
          />
          <p
            className="relative z-10
               mt-6 mb-4
               text-center text-3xl md:text-4xl
               font-bold uppercase tracking-widest
               text-amber-500
               drop-shadow-[0_2px_0_rgba(0,0,0,0.35)]
               select-none
               after:content-['★']
               after:inline-block after:ml-2
               after:text-teal-400"
          >
            Collection
          </p>{" "}
          {children}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 m-4">
            {data.map((d) => {
              return (
                <Card
                  key={d.id}
                  data={d}
                  setPage={setPage}
                  setSelectedSet={setSelectedSet}
                  isInGame={false}
                  collectedCards={collectedCards}
                  selectedSet={set}
                  setLoading={setLoading}
                ></Card>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="collection-wrap relative m-6">
          <div className="flex items-baseline justify-center z-20 p-6 m-6">
            {children}
            <img
              className="set-logo"
              src={`https://images.pokemontcg.io/${
                data[0].id.split("-")[0]
              }/logo.png`}
              alt={`image for tcg set ${data.name}`}
            />
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 m-4">
            {data.map((d) => {
              return (
                <Card
                  key={d.id}
                  data={d}
                  setPage={setPage}
                  setSelectedSet={setSelectedSet}
                  isInGame={false}
                  collectedCards={collectedCards}
                  page={page}
                  selectedSet={set}
                  setLoading={setLoading}
                ></Card>
              );
            })}
          </div>
        </div>
      )
    ) : (
      <div
        className="relative min-h-screen
                bg-gradient-to-br from-indigo-200 via-sky-100 to-emerald-50
      pb-24 overflow-hidden"
      >
        <p
          className="relative z-10
             mt-8 mb-6
             w-full text-center
             font-extrabold uppercase
             text-4xl md:text-5xl
             tracking-widest
             bg-clip-text text-transparent
             bg-gradient-to-r from-amber-200 via-yellow-50 to-rose-200
             drop-shadow-[0_4px_0_rgba(0,0,0,0.35)]
             select-none
             after:inline-block after:ml-3
             after:text-rose-300
            "
        >
          Memory Trails
        </p>
        {children}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-6">
          {data.map((d, idx, arr) => {
            const prevSet = arr[idx - 1];
            let prevSetPrecent = 100;
            if (prevSet) {
              const PrevSetLength = prevSet.total;
              const cards = collectedCards[prevSet.id];
              const cardsNum = cards ? cards.length : 0;
              prevSetPrecent = Math.floor((cardsNum / PrevSetLength) * 100);
            }

            return (
              <Card
                key={d.id}
                data={d}
                setPage={setPage}
                setSelectedSet={setSelectedSet}
                isInGame={true}
                collectedCards={collectedCards}
                prevSetPrecent={prevSetPrecent}
                setLoading={setLoading}
              ></Card>
            );
          })}
        </div>
      </div>
    );
  }
}
