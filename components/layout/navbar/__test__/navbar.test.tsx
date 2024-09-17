import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "../index";

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

describe("Navbar Component", () => {
  it("should render the Navbar component", () => {
    render(<Navbar />);

    const navbarElement = screen.getByRole("navigation");
    expect(navbarElement).toBeInTheDocument();
  });

  it("should display the logo", () => {
    render(<Navbar />);
    const logoElement = screen.getByAltText("Logo");
    expect(logoElement).toBeInTheDocument();

    fireEvent.click(logoElement);
    expect(window.location.pathname).toBe("/");
  });

  it("should have search input", () => {
    render(<Navbar />);

    const searchInput = screen.getByPlaceholderText("Search...");

    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue("");

    fireEvent.change(searchInput, { target: { value: "Inception" } });

    expect(searchInput).toHaveValue("Inception");
  });
});
