export function Button({ children, handleClick, disabled }) {
  return (
    <button
      className="border-solid border px-8"
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
