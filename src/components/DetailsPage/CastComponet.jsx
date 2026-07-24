import SkeletonCastComponent from "../SkeletonLoadingState/SkeletonCastComponent";
import CastCard from "./CastCard";

const CastComponet = ({ cast, crew, isLoading }) => {
  if (isLoading) {
    return <SkeletonCastComponent />;
  }

  const castArray = cast.slice(0, 9);
  const director = crew.find((person) => person.job === "Director") ?? crew.find(person => person.job === "Creator")?? crew.find(person => person.job === "Executive Producer") ?? null;
  const newArr = director? [director, ...castArray] : castArray;

  return (
    <div className="h-fit w-full px-10 py-6 mt-10 flex flex-col items-center gap-2 border-b-2 border-t-2 border-stone-600">
      <div className="w-full">
        <h1 className="text-2xl">Cast & Crew</h1>
      </div>
      <div className="h-85 w-full flex gap-6 overflow-x-auto cast-list">
        {newArr.map((item, idx) => (
          <CastCard key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CastComponet;
