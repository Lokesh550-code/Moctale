import { CircleDot, Circle } from "lucide-react";
import { useState } from "react";
import { getCurrentMonthRange } from "../../utils/dateUtils.js";

const SideBar = (props) => {
  const time = ["This Week", "This Month", "This Year", "All Time"];
  const [timeFrame, setTimeFrame] = useState(`This Week`);
  const monthObj = getCurrentMonthRange;
  return (
    <div className="h-full w-[15%] py-9  relative text-white">
      <div className="h-fit w-full sticky top-22 flex flex-col gap-4">
        <h1 className="uppercase text-2xl font-bold text-stone-400">
          Timeframe
        </h1>
        <div className="h-fit w-full flex flex-col gap-[0.2rem]">
          {time.map((period) => {
            return (
              <div
                onClick={() => {
                  setTimeFrame(period);
                  props.setPage(1);
                  props.setTimePeriod(
                    period === "This Week"
                      ? "/trending/movie/week"
                      : period === "This Month"
                        ? `/discover/movie?primary_release_date.gte=${monthObj.start}&primary_release_date.lte=${monthObj.end}&sort_by=popularity.desc`
                        : period === "This Year"
                          ? `/discover/movie?primary_release_year=${monthObj.year}&sort_by=popularity.desc`
                          : period == "All Time"
                            ? "/discover/movie?sort_by=popularity.desc"
                            : "/discover/movie?sort_by=popularity.desc",
                  );
                  props.setTimePeriodTv(
                    period === "This Week"
                      ? "/trending/tv/week"
                      : period === "This Month"
                        ? `/discover/tv?first_air_date.gte=${monthObj.start}&first_air_date.lte=${monthObj.end}&sort_by=popularity.desc`
                        : period === "This Year"
                          ? `/discover/tv?first_air_date_year=${monthObj.year}&sort_by=popularity.desc`
                          : period === "All Time"
                            ? "/discover/tv?sort_by=popularity.desc"
                            : "/discover/tv?sort_by=popularity.desc",
                  );
                }}
                className={`h-10 w-full px-4 rounded flex items-center gap-3 text-md ${period == timeFrame ? `bg-stone-800` : "bg-black"} hover:bg-stone-800 transition cursor-pointer`}
              >
                {period === timeFrame ? (
                  <CircleDot strokeWidth={3} />
                ) : (
                  <Circle color="#918C88" strokeWidth={3} />
                )}
                {period}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
