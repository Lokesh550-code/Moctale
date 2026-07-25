import { useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import { getSearchTMDB } from "../../services/search";
import Tab from "./Tab";
import SearchCard from "./SearchCard";
import SearchBar from "./SearchBar";
import SearchSkeletonCard from "../SkeletonLoadingState/SearchSkeletonCard";
import EmptyState from "./EmptyState";
import NoResultState from "./NoResultState";
import ErrorState from "./ErrorState";
import { Link } from "react-router-dom";

const SearchComponent = ({ isClicked, setIsClicked }) => {
  const lenis = useLenis();
  const inputRef = useRef(null);

  const selection = [`All`, `Movies`, `TV Shows`, `People`];

  const [activeTab, setActiveTab] = useState(`All`); //Used to get Update just the tab.
  const [search, setSearch] = useState(``); // Used to show data for Form.
  const [searchType, setSearchType] = useState("multi"); // Used to store the querry. (multi, movie, tv, people)
  const [query, setQuery] = useState(``); // Used to store search query
  const [results, setResults] = useState([]); // Used to store the recieved data

  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(null);

  const showRef = useRef(null);

  useEffect(() => {
    const handleClickedOutside = (event) => {
      if (showRef.current && !showRef.current.contains(event.target)) {
        setIsClicked(false);
      }
    };
    document.addEventListener("mousedown", handleClickedOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickedOutside);
    };
  }, [setIsClicked]);

  const getMediaType = (result) => {
    if (result.media_type) {
      return result.media_type;
    }

    switch (searchType) {
      case "movie":
        return "movie";
      case "tv":
        return "tv";
      case "person":
        return "person";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (!query.trim()) return;
    const callingFunc = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const arr = await getSearchTMDB(searchType, query);
        setResults(arr);
      } catch (err) {
        console.error(err.message);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    callingFunc();
  }, [query, searchType]);

  useEffect(() => {
    if (isClicked) {
      lenis?.stop();
      () => setHasSearched(false);
      () => setResults([]);
      () => setQuery("");
      () => setSearch("");

      //   document.documentElement.style.overflow = "hidden"; used for standard application
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
    if (!isClicked) {
      lenis?.start();
      //   document.documentElement.style.overflow = "auto";
    }

    return () => {
      lenis?.start();
      //   document.documentElement.style.overflow = "auto";
    };
  }, [isClicked, lenis]);
  return (
    <div
      ref={showRef}
      className={`w-full h-[60vh] border-b-2 bg-black border-stone-500 fixed flex flex-col gap-2.5 px-10 py-4 overflow-y-hidden ${isClicked ? "opacity-100 z-999999" : "opacity-0 -z-3"}`}
    >
      <div
        onClick={() => inputRef.current?.focus()}
        className="min-h-12 w-full cursor-text text-white bg-stone-800 rounded-md overflow-hidden px-4"
      >
        <SearchBar
          search={search}
          setSearch={setSearch}
          setQuery={setQuery}
          setHasSearched={setHasSearched}
        />
      </div>

      <div className="w-full h-[90%] text-white">
        <div className="w-full h-[15%] flex items-center  gap-3 border-b border-stone-500">
          <Tab
            selection={selection}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setSearchType={setSearchType}
          />
        </div>
        <div
          className="max-h-[85%] w-full py-2 flex flex-wrap gap-2 flex-1 overflow-y-scroll"
          data-lenis-prevent
        >
          {!hasSearched ? (
            <EmptyState />
          ) : isLoading ? (
            Array.from({ length: 8 }).map((_, id) => (
              <SearchSkeletonCard key={id} />
            ))
          ) : error ? (
            <ErrorState />
          ) : results.length === 0 ? (
            <NoResultState />
          ) : (
            results.map((item) => {
              const mediaType = getMediaType(item).toLowerCase();
              console.log(item.media_type, getMediaType(item));

              return (
                <Link
                  key={item.id}
                  to={`/${mediaType}/${item.id}`}
                  onClick={() => setIsClicked(false)}
                >
                  <SearchCard
                    id={item.id}
                    title={item.title || item.name}
                    media_type={mediaType}
                    image={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : item.profile_path
                          ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                          : item.images?.jpg?.image_url
                    }
                  />
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
