import { useState, useEffect } from "react";
import SectionCard from "./SectionCard";
import TrendingBar from "./TrendingBar";
import { getTrending } from "../../services/media";
import RowSkeletonCard from "../SkeletonLoadingState/RowSkeletonCard";
import { NavLink } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const SectionRow = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [period, setPeriod] = useState("/trending/movie/week");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getmovies = async (period) => {
      setIsLoading(true);
      const arr = await getTrending(`${period}`);
      setTrendingMovies(arr.slice(0, 5));
      setIsLoading(false);
    };
    getmovies(period);
  }, [period]);

  return (
    <>
      <div className="w-full h-full">
        <TrendingBar setPeriod={setPeriod} />
        {isLoading &&
          Array(5)
            .fill(0)
            .map((item, id) => {
              return <RowSkeletonCard key={id} id={id} />;
            })}
        {!isLoading &&
          trendingMovies.map((item, idx) => {
            return (
              <Link to={`/${item.media_type}/${item.id}`}>
                <SectionCard
                  id={idx}
                  title={item.title}
                  media_type={item.media_type}
                  release_date={item.release_date}
                  rating={item.vote_average}
                  imageUrl={item.poster_path}
                  key={item.id}
                />
              </Link>
            );
          })}
        <div className="h-fit w-full  mt-4 flex justify-end">
          <div className="h-10 w-[35%] text-white text-xl flex justify-center items-center bg-stone-950 border border-stone-800 rounded hover:bg-stone-700 hover:border-stone-950 transition">
            <NavLink
              className="flex justify-center items-center gap-2"
              to="/trending"
            >
              Show All <ArrowUpRight size={25} />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionRow;
