import HiddenGems from "../components/HomePage/CritiicallyAcclaimed";
import SectionRow from "../components/HomePage/SectionRow";
import TalkSection from "../components/HomePage/TalkSection";
import TopRated from "../components/HomePage/TopRated";

const HomePage = ({ movieData }) => {
  return (
    
    <div className="w-full h-fit py-4 px-10 flex gap-4 mt-18">
      <div className="w-[70%] h-full flex flex-wrap gap-4 truncate">
        <TalkSection movieData={movieData} />
        <TopRated />
        <HiddenGems />
      </div>

      <div className="w-[30%] flex flex-col items-center justify-start">
        <SectionRow />
      </div>
    </div>
  );
};

export default HomePage;
