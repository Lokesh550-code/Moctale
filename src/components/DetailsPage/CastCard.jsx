import placeholder from "../../assets/castPlaceHolder.webp";

const CastCard = ({ item }) => {
  return (
    <div className="h-75 w-41 mt-4 py-3 flex flex-col shrink-0 items-start gap-2 rounded hover:bg-stone-900">
      <div className="h-50 w-41 rounded-sm overflow-hidden object-cover">
        <img
          src={
            item.profile_path
              ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
              : placeholder
          }
          alt=""
        />
      </div>
      <div>
        <h1 className="text-md text-stone-300">
          {item.job ? `${item.job}:` : item.character}
        </h1>
        <h1 className="text-md text-stone-300">
          {item.job ? item.name : `played by: ${item.name}`}
        </h1>
      </div>
    </div>
  );
};

export default CastCard;
