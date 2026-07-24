import { Search, X } from "lucide-react";
import { useState } from "react";
import SearchComponent from "./SearchPage/SearchComponent";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isClicked, setIsClicked] = useState(false);

  const clickHandle = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <div className="w-full h-18 px-10 flex gap-2 bg-black fixed top-0 left-0 border border-b-stone-600 z-50">
        <div className="w-1/2 h-full flex items-center justify-start ">
          <h1 className="text-white font-semibold text-3xl">Kshan</h1>
        </div>
        <div className="text-white text-lg h-full w-1/2 flex justify-center items-center gap-6 navbar-container">
          <NavLink className={({isActive}) => `${isActive? "text-orange-500":"text-white"}`} to="/">Home</NavLink>
          <NavLink className={({isActive}) => `${isActive? "text-orange-500":"text-white"}`} to="/trending">Trending</NavLink>
        </div>
        <div className="w-1/2 h-full flex gap-4 items-center justify-end">
          <button
            onClick={() => {
              clickHandle();
            }}
            className="text-white cursor-pointer"
          >
            {!isClicked ? <Search size={20} /> : <X size={23} />}
          </button>
        </div>
      </div>

      <SearchComponent isClicked={isClicked} setIsClicked={setIsClicked} />
    </>
  );
};

export default Navbar;
