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
          shadow-inner text-[0.75rem]
          transition-all active:translate-y-[1px] 
          flex items-center justify-center"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
