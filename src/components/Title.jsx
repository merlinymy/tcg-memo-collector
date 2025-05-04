import pokemon from "../assets/img/pokemon48.png";
import tcg from "../assets/img/TCG.png";
import memory from "../assets/img/memory38.png";

export function Title() {
  return (
    <div className=" title-wrap flex flex-col absolute left-[50%] top-[10%] transform translate-x-[-50%] w-[100dvw] md:w-[35dvw]  bg-[white]/50">
      <img className=" " src={pokemon} alt="" />
      <img className="" src={tcg} alt="" />
      <img className="" src={memory} alt="" />
    </div>
  );
}
