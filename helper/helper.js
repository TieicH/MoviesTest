function setResults(totalResults) {
  const totalPages =
    totalResults % 10 > 0
      ? Math.ceil(totalResults / 10 + 1 - (totalResults % 10) / 10)
      : totalResults / 10;
  dispatch(setTotalResults(totalPages));
  dispatch(searchMovie(Search));
}
