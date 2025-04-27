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
    <div className="collection-wrap">
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
            ></Card>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="level-selection">
      {children}
      <p>In level selection</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 m-2">
        {data.map((d) => {
          return (
            <Card
              key={d.id}
              data={d}
              setPage={setPage}
              setSelectedSet={setSelectedSet}
              isInGame={true}
            ></Card>
          );
        })}
      </div>
    </div>
  );
}
