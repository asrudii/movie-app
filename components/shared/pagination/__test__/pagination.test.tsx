import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from "../index";

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

afterEach(() => {
  jest.clearAllMocks();
});

describe("useNumberPagination", () => {
  it("should initialize with the correct page and total pages", () => {
    render(<Pagination totalPage={1} page={1} />);

    const buttonPage = screen.getByText("1");

    expect(buttonPage).toBeInTheDocument();
    expect(buttonPage).toHaveClass("pagination__item__active");
  });

  it("should go to the next page", () => {
    render(<Pagination totalPage={2} page={1} />);

    const nextButton = screen.getByTestId("pagination-next");
    fireEvent.click(nextButton);

    expect(replaceMock).toHaveBeenCalledWith("/?page=2");
  });

  it("should go to the previous page", () => {
    render(<Pagination totalPage={20} page={2} />);

    const prevButton = screen.getByTestId("pagination-prev");
    fireEvent.click(prevButton);

    expect(replaceMock).toHaveBeenCalledWith("/?page=1");
  });

  it("should not go to the previous page if already on the first page", () => {
    render(<Pagination totalPage={20} page={1} />);

    const prevButton = screen.getByTestId("pagination-prev");
    fireEvent.click(prevButton);

    expect(replaceMock).not.toHaveBeenCalledWith("/?page=1");
  });

  it("should not go to the next page if already on the last page", () => {
    render(<Pagination totalPage={20} page={20} />);

    const nextButton = screen.getByTestId("pagination-next");
    fireEvent.click(nextButton);

    expect(replaceMock).not.toHaveBeenCalledWith("/?page=20");
  });

  it("should go to a specific page", () => {
    render(<Pagination totalPage={20} page={1} />);

    const buttonPage = screen.getByText("20");

    fireEvent.click(buttonPage);

    expect(replaceMock).toHaveBeenCalledWith("/?page=20");
  });
});
