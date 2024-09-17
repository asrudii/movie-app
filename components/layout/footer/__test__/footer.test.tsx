import { render, screen } from "@testing-library/react";
import Footer from "../index";

describe("Footer", () => {
  it("should render the Footer component", () => {
    render(<Footer />);

    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(
      screen.getByText("© 2024 movieapp. All rights reserved.")
    ).toBeInTheDocument();
  });

  it("should have a link to the home page with the logo", () => {
    render(<Footer />);

    const logoLink = screen.getByRole("link", { name: /logo/i });
    expect(logoLink).toHaveAttribute("href", "/");
  });
});
