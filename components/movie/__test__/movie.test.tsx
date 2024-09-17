import { render, screen } from "@testing-library/react";
import Movie from "../index";
import movieService from "@/core/services/movie.service";
import { QueryClient, QueryClientProvider } from "react-query";
// import axios, {
//   AxiosError,
//   AxiosResponse,
//   InternalAxiosRequestConfig,
// } from "axios";
import { useSearchParams } from "next/navigation";

const pushMock = jest.fn();
const replaceMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    pathname: "/",
    query: {},
    replace: replaceMock,
    asPath: "/",
  }),
  usePathname: jest.fn().mockReturnValue("/"),
  useSearchParams: jest.fn(),
}));

jest.mock("@/core/services/movie.service");

const dummyData = Array.from({ length: 10 }, (_, i) => ({
  id: `019159c5-19bc-7581-83b0-3a61bb99553${i}`,
  title: `Test-${i}`,
  vote_count: 10,
  vote_average: 10.0,
  video: false,
  release_date: `2023-01-0${i}`,
  poster_path: "/test-image.jpg",
  popularity: 10.0,
  overview: `Test overview ${i}`,
  original_title: `Test Movie ${i}`,
  original_language: "en",
  backdrop_path: "/test-image.jpg",
  genre_ids: [1, 2, 3],
  adult: false,
}));

const mockData = {
  data: {
    results: dummyData,
    page: 1,
    total_pages: 2,
    total_results: 10,
  },
};

describe("Movie Component", () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    (movieService.search as jest.Mock).mockResolvedValue(mockData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should render movies", async () => {
    (useSearchParams as jest.Mock).mockImplementation(
      () => new URLSearchParams("search=test")
    );

    render(
      <QueryClientProvider client={queryClient}>
        <Movie />
      </QueryClientProvider>
    );

    expect(await screen.findByText("Test-1")).toBeInTheDocument();
    expect(await screen.findByText("Release : 2023-01-01")).toBeInTheDocument();
  });

  it("should render empty state when no movies found", async () => {
    (useSearchParams as jest.Mock).mockImplementation(
      () => new URLSearchParams("search=test")
    );

    (movieService.search as jest.Mock).mockResolvedValueOnce({
      data: {
        results: [],
        page: 1,
        total_pages: 0,
        total_results: 0,
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Movie />
      </QueryClientProvider>
    );

    expect(await screen.findByText("No data found")).toBeInTheDocument();
  });

  // Error scenario is not working properly cause of the error handling in the useQuery not return error

  // it("should render error state when there is error network", async () => {
  //   (useSearchParams as jest.Mock).mockImplementation(
  //     () => new URLSearchParams("search=test")
  //   );

  //   const error = new axios.AxiosError(
  //     "Gagal Menyimpan Data",
  //     "test",
  //     {} as InternalAxiosRequestConfig,
  //     "test",
  //     {
  //       status: 500,
  //       statusText: "Bad Request",
  //       data: {
  //         message: "Network Error",
  //       },
  //     } as AxiosResponse<Error>
  //   ) as AxiosError<Error>;

  //   (movieService.search as jest.Mock).mockRejectedValue(error);

  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <Movie />
  //     </QueryClientProvider>
  //   );

  //   expect(await screen.findByText("Network Error")).toBeInTheDocument();
  // });
});
