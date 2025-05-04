import { Button } from "./Button";

export function TopBar({ setPage }) {
  const gotoPage = (page) => setPage(page);

  return (
    <nav
      className="
    fixed bottom-0 inset-x-0 z-20
    flex items-center justify-center gap-4
    h-14 px-4
    bg-gradient-to-b from-red-600 to-red-500
    border-t-4 border-yellow-400
    shadow-md shadow-red-700/40
  "
    >
      <Button handleClick={() => gotoPage("starting")}>Menu</Button>
      <Button handleClick={() => gotoPage("gameSelect")}>Trails</Button>
      <Button handleClick={() => gotoPage("collections")}>Collections</Button>
    </nav>
  );
}
