import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";
import { getCritiicallyAcclaimed } from "../../services/media";
import SkeletonCards from "../SkeletonLoadingState/SkeletonCards";
import { Link } from "react-router-dom";

const CritiicallyAcclaimed = () => {
  const [underRatedMoives, setUnderRatedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const callingFunc = async () => {
      setIsLoading(true);
      const arr = await getCritiicallyAcclaimed();
      setUnderRatedMovies(arr.slice(0, 10));
      setIsLoading(false);
    };
    callingFunc();
  }, []);

  return (
    <div className="h-full w-full text-white text-3xl">
      <div className="h-7 w-full">
        <h1>Critically Acclaimed</h1>
      </div>
      <div className="w-full mt-4 flex flex-wrap gap-2">
        {isLoading &&
          Array(10)
            .fill(0)
            .map((elem, id) => {
              return <SkeletonCards key={id} />;
            })}
        {!isLoading &&
          underRatedMoives.map((item, idx) => {
            return (
              <Link to={`/${item.media_type}/${item.id}`}>
                <MovieCard
                  id={item.id}
                  poster_path={item.poster_path}
                  type={item.media_type}
                  title={item.title || item.name}
                  key={idx}
                />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default CritiicallyAcclaimed;
