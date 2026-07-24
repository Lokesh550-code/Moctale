import Card from "./Card";
import Pagination from "./Pagination";
import TrendingSkeletonCard from "../SkeletonLoadingState/TrendingSkeletonCard";
import { Link } from "react-router-dom";

const Content = ({ trending, isLoading, page, setPage }) => {
  let id = -1;
  return (
    <>
      <div className="h-fit w-[80%] text-white">
        <div className="pb-4 border-b border-stone-600 ">
          <h1 className="text-[2.2rem] font-bold uppercase mt-2">Trending</h1>
        </div>
        <div className="h-full w-full mb-5">
          {isLoading &&
            Array(10)
              .fill(0)
              .map((item, id) => {
                return <TrendingSkeletonCard key={id} id={id} />;
              })}
          {!isLoading &&
            trending.map((item, key) => {
              id++;
              return (
                <Link to={`/${item.media_type}/${item.id}`}>
                  <Card
                    key={key}
                    id={id}
                    title={item.title}
                    name={item.name}
                    media_type={item.media_type}
                    release_date={item.release_date}
                    vote_average={item.vote_average}
                    poster_path={item.poster_path}
                    image={item.image}
                    first_air_date={item.first_air_date}
                  />
                </Link>
              );
            })}
        </div>
        <div className="h-40 w-full">
          <Pagination page={page} setPage={setPage} />
        </div>
      </div>
    </>
  );
};

export default Content;
