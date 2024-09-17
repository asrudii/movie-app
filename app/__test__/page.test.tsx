// __tests__/Home.test.tsx
import { render, screen } from "@testing-library/react";
import Home from "../page";

jest.mock("@/components/movie", () => ({
  __esModule: true,
  default: () => <div data-testid="movie-component" />,
}));

describe("Home component", () => {
  it("renders Movie component inside Suspense", () => {
    render(<Home />);
    const movieComponent = screen.getByTestId("movie-component");
    expect(movieComponent).toBeInTheDocument();
  });
});
