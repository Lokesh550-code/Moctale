export const mergeMedia = (movie, tv) => {
  return [
    ...movie.results.map((item) => ({ ...item, media_type: `movie` })),
    ...tv.results.map((item) => ({ ...item, media_type: `tv` })),
  ].sort((a, b) => b.popularity - a.popularity);
};