import SideBar from "../components/TrendingPage/SideBar";
import Content from "../components/TrendingPage/Content";
import { useState } from "react";
import { useEffect } from "react";
import { getTrendingMedia } from "../services/media";

export const TrendingPage = () => {
  const [timePeriod, setTimePeriod] = useState("/trending/movie/week");
  const [timePeriodTv, setTimePeriodTv] = useState("/trending/tv/week");
  const [trending, setTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getMedia = async () => {
      try {
        setErrorState(null);
        setIsLoading(true);
        const data = await getTrendingMedia(timePeriod, timePeriodTv, page);
        setTrending(data);
      } catch (err) {
        setErrorState(err);
      } finally {
        setIsLoading(false);
      }
    };
    getMedia();
  }, [timePeriod, timePeriodTv, page]);
  return (
    <>
      <div className=" h-fit w-full mt-18 relative flex justify-between px-10">
        <SideBar
          setTimePeriod={setTimePeriod}
          setTimePeriodTv={setTimePeriodTv}
          setPage={setPage}
        />
        <Content
          trending={trending}
          isLoading={isLoading}
          page={page}
          setPage={setPage}
          errorState={errorState}
        />
      </div>
    </>
  );
};

export default TrendingPage;
