export function EntryPage({ setPage }) {
  const start = () => {
    setPage("starting");
  };

  return (
    <div
      className="flex justify-center items-center h-[100dvh] w-[100dvw]"
      onClick={start}
    >
      <p>click to start</p>
    </div>
  );
}
