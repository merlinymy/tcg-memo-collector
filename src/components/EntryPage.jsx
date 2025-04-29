export function EntryPage({ setPage }) {
  const start = () => {
    setPage("starting");
  };

  return (
    <div className="h-[100dvh] w-[100dvw]" onClick={start}>
      <p>click anywhere to start</p>
    </div>
  );
}
