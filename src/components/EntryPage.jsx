export function EntryPage({ musicRef, setPage }) {
  const start = () => {
    if (!musicRef.current) {
      const a = new Audio("/music/pocketMenu.mp3");   // initial track
      a.loop = true;
      a.volume = 1;
      a.play().catch(err => console.log("blocked:", err));
      musicRef.current = a;                           // 🔑 store same object
    } else {
      musicRef.current.play().catch(() => {});
    }
    setPage("starting");
  };

  return (
    <div className="flex items-center justify-center h-[100dvh] w-[100dvw]" onClick={start}>
      <p>click anywhere to start</p>
    </div>
  );
}