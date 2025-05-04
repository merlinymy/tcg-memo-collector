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
        <div className="collection-wrap relative">
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
          <div className="flex items-baseline ">
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
      <div className="level-selection relative">
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
