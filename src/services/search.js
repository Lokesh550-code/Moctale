import tmdb from "./clients/tmdb";
import { request } from "./helpers/request";

export const getSearchTMDB = async (searchType, query) => {
  const data = await request(tmdb, `/search/${searchType}`, {
    params: {
      query,
    },
  });
  if (searchType === "multi") {
    return data.results;
  } 
  
  return data.results.map(item => ({
    ...item, media_type: searchType,
  }))
};
