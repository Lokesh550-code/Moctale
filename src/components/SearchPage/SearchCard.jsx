import Placeholder from "../../assets/placeholder.png";

const SearchCard = (props) => {
  const isLong = (props.title ?? "").length > 17;

  return (
    <div
      id={props.id}
      className="group h-32 w-82 overflow-hidden rounded-sm bg-black p-1 flex items-center gap-2 cursor-pointer transition-all hover:bg-stone-900"
    >
      <div className="h-full w-[25%] overflow-hidden rounded-sm">
        <img
          loading="lazy"
          className="h-full w-full object-cover"
          src={props.image || Placeholder}
          alt={props.title}
        />
      </div>

      <div className="w-[60%] flex flex-col justify-center overflow-hidden">
        {isLong ? (
          <div className="marquee-container">
            <div className="marquee">
              <span className="text-stone-400 text-[1.4rem]">
                {props.title}
              </span>
              <span className="text-stone-400 text-[1.4rem]">
                {props.title}
              </span>
            </div>
          </div>
        ) : (
          <h3 className="truncate text-stone-400 text-[1.4rem]">
            {props.title}
          </h3>
        )}

        <p className="text-stone-500 text-sm capitalize">{props.media_type}</p>
      </div>
    </div>
  );
};

export default SearchCard;
