export function Button({ children, handleClick }) {
  return (
    <button className="border-solid border px-8" onClick={handleClick}>
      {children}
    </button>
  );
}
