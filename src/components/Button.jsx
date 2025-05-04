import AudioManager from "../audio/AudioManager";

export function Button({ children, handleClick, disabled }) {
  const onClick = () => {
    handleClick();
    AudioManager.playSfx("click");
  };
  return (
    <button
      className="
          px-4 py-1 font-extrabold uppercase tracking-wider
          bg-yellow-300 text-gray-900            /* ✅ high contrast */
          hover:bg-yellow-400
          border-2 border-gray-900 rounded-lg
          shadow-inner
          transition-all active:translate-y-[1px]"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
