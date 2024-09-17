import { render, screen, waitFor } from "@testing-library/react";
import MovieCard from "../index";

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

describe("MovieCard", () => {
  const props = {
    image: "/test-image.jpg",
    id: "1",
    title: "Test Movie",
    release: "2023-01-01",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the MovieCard component", () => {
    render(<MovieCard {...props} />);

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("Release : 2023-01-01")).toBeInTheDocument();
  });

  it("should display the skeleton loader before the image loads", () => {
    render(<MovieCard {...props} />);

    const skeleton = screen.getByRole("img", { hidden: true });
    expect(skeleton).toBeInTheDocument();
  });

  it("should display the image after it loads", () => {
    render(<MovieCard {...props} />);

    const image = screen.getByAltText("movie image");

    expect(image).toBeInTheDocument();

    waitFor(() => {
      expect(image).toHaveAttribute(
        "src",
        `/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw500%2Ftest-image.jpg&w=1080&q=75`
      );
    });
  });

  it("should display the fallback image if no image is provided", () => {
    const withoutImage = { ...props, image: "" };
    render(<MovieCard {...withoutImage} />);

    const image = screen.getByAltText("movie image");
    expect(image).toHaveAttribute(
      "src",
      "/_next/image?url=%2Fimages%2Fno-image.jpg&w=1080&q=75"
    );
  });

  it("should navigate to the correct movie page when clicked", () => {
    render(<MovieCard {...props} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/movie/1");
  });
});
