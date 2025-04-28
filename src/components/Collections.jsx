import { useEffect, useState } from "react";
import { Card } from "./Card";
import { TopBar } from "./TopBar";

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

  useEffect(() => {
    async function fetchData() {
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
      }
    }
    fetchData();
  }, [type, set]);
  return isInCollection ? (
    page === "collections" ? (
      <div className="collection-wrap relative">
        {children}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 m-2">
          {data.map((d) => {
            return (
              <Card
                key={d.id}
                data={d}
                setPage={setPage}
                setSelectedSet={setSelectedSet}
                isInGame={false}
                collectedCards={collectedCards}
              ></Card>
            );
          })}
        </div>
      </div>
    ) : (
      <div className="collection-wrap relative">
        {children}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 m-2">
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
              ></Card>
            );
          })}
        </div>
      </div>
    )
  ) : (
    <div className="level-selection">
      {children}
      <p>In level selection</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 m-2">
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
            ></Card>
          );
        })}
      </div>
    </div>
  );
}
