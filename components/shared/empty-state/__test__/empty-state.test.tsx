import { render, screen } from "@testing-library/react";
import EmptyState from "../index";
import axios, { AxiosError, AxiosResponse } from "axios";

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
  useSearchParams: jest
    .fn()
    .mockReturnValue({ get: jest.fn().mockReturnValue("") }),
}));

describe("Index Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the empty state when loading", () => {
    render(<EmptyState isLoading={true} error={null} isNotFound={false} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render the error state when there is an error", () => {
    const error = new axios.AxiosError(
      "Gagal Menyimpan Data",
      "test",
      undefined,
      "test",
      {
        status: 500,
        statusText: "Bad Request",
        data: {
          message: "Network Error",
        },
      } as AxiosResponse<Error>
    ) as AxiosError<Error>;

    render(<EmptyState isLoading={false} error={error} isNotFound={false} />);

    expect(screen.getByText("Error | 500")).toBeInTheDocument();
    expect(screen.getByText("Network Error")).toBeInTheDocument();
  });

  it("should render the not found state when there is no data found", () => {
    render(<EmptyState isLoading={false} error={null} isNotFound={true} />);

    expect(screen.getByText("No data found")).toBeInTheDocument();
  });

  it("should render initial state when user not searching yet", () => {
    render(<EmptyState isLoading={false} error={null} isNotFound={false} />);

    expect(
      screen.getByText("Search movie using searchbar above")
    ).toBeInTheDocument();
  });
});
