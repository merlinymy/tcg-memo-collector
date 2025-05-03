import AudioManager from "../audio/AudioManager";

export function Button({ children, handleClick, disabled }) {
  const onClick = () => {
    handleClick();
    AudioManager.playSfx("click");
  };
  return (
    <button
      className="border-solid border px-8 cursor-pointer"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
