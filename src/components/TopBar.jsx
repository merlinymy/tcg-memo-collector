import { Button } from "./Button";

export function TopBar({ prevPage, setPage, isInGameSelect }) {
  const goBack = function (prevPage) {
    setPage(prevPage);
  };
  return (
    <div className="top-bar">
      <Button handleClick={() => goBack(prevPage)}>Back</Button>
      {!isInGameSelect && <Button>Sort By</Button>}
    </div>
  );
}
