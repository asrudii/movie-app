export const updateSearchParams = (
  key: string,
  value: string | number | null,
  searchParams: URLSearchParams
) => {
  if (value) {
    searchParams.set(key, value.toString());
    searchParams.delete("page");
  } else {
    searchParams.delete(key);
  }
  return searchParams;
};
