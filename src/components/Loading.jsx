export function Loading({ percent }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/100 z-50">
      <div className="h-2 w-2/3 bg-neutral-700 rounded">
        <div
          className="h-full bg-emerald-400 rounded"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-3 text-white">{percent}%</p>
    </div>
  );
}
