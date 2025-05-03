import { Button } from "./Button";

export function TopBar({ prevPage, setPage, isInGameSelect }) {
  const goBack = function (prevPage) {
    setPage(prevPage);
  };
  return (
    <div className="top-bar m-3 sticky top-0 bg-[white] z-15">
      <Button handleClick={() => goBack(prevPage)}>Back</Button>
      {/* {!isInGameSelect && <Button>Sort By</Button>} */}
    </div>
  );
}
