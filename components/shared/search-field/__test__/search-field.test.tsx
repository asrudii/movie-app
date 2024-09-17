import { act, fireEvent, render, screen } from "@testing-library/react";
import SearchField from "../index";

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

describe("SearchField Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("should render the SearchField component", () => {
    render(<SearchField />);
    const searchInput = screen.getByPlaceholderText("Search...");
    expect(searchInput).toBeInTheDocument();
  });

  it("should update the input value when typed into", () => {
    render(<SearchField />);
    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "Inception" } });
    expect(searchInput).toHaveValue("Inception");
  });

  it("should change params when the search changed", () => {
    render(<SearchField />);

    const searchInput = screen.getByPlaceholderText("Search...");

    fireEvent.change(searchInput, { target: { value: "Inception" } });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(replaceMock).toHaveBeenCalledWith("/?search=Inception");
  });
});
