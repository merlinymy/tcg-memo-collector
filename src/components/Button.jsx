export function Button({ children, handleClick, disabled }) {
  return (
    <button
      className="border-solid border px-8 cursor-pointer"
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
