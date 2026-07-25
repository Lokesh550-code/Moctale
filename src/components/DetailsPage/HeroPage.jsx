import { releaseDate } from "../../utils/releaseDate";
import { minutesFunction } from "../../utils/MinutesToHours";
import SkeletonHeroPage from "../SkeletonLoadingState/SkeletonHeroPage";
const HeroPage = ({ result, isLoading }) => {
  if (isLoading) {
    return <SkeletonHeroPage />;
  }

  return (
    <div
      className="h-[90vh] w-full flex items-end "
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${result.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="h-1/2 w-full px-10 flex items-end justify-end gap-3 bg-linear-to-b from-transparent via-black/70 to-black">
        <div className="h-[89%] w-auto rounded overflow-hidden">
          <img
            className="h-full w-auto rounded-md"
            src={
              result.poster_path
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                : `https://image.tmdb.org/t/p/original${result.profile_path}`
            }
            alt=""
          />
        </div>
        <div className="h-fit w-full flex flex-col gap-3">
          <div className="w-full">
            <h1 className="text-4xl text-white">
              {result.title || result.name}
            </h1>
          </div>
          <div>
            <span className="text-xl">
              {result.status || result.place_of_birth} •{" "}
              {result.runtime
                ? minutesFunction(result.runtime)
                : !result.episode_run_time
                  ? result.known_for_department
                  : result.episode_run_time.length != 0
                    ? "unavailable "
                    : `${result.episode_run_time[0]} min `} {" "}
              • {" "}
              {result.release_date
                ? releaseDate(result.release_date)
                : result.birthday
                  ? releaseDate(result.birthday)
                  : releaseDate(result.first_air_date)}
            </span>
          </div>
          <div className="w-[45%] max-h-[26vh] h-fit overflow-hidden text-white text-[18px] leading-5">
            <p className="text-stone-300">
              {result.overview ? result.overview : result.biography}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
