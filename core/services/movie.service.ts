import { AxiosResponse } from "axios";
import { AxiosInstance } from "../api/axios-instance";

// Function to search for movies based on a query string
interface ISearchProps {
  query: string;
  page: string;
  [key: string]: string;
}
const search = (
  props: ISearchProps
): Promise<AxiosResponse<ISearchMovieResponse>> => {
  const params = new URLSearchParams();
  for (let param in props) {
    if (props[param]) {
      params.append(param, props[param]);
    }
  }

  return AxiosInstance.get("/search/movie", {
    params,
  }); // Making a GET request to the movie search endpoint with the query
};

// Creating an object to hold the search function
const movieService = {
  search,
};

export default movieService; // Exporting the movieService object as the default export
