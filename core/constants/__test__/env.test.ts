import { API_URL, POSTER_URL, THEME_MOVIE_API_KEY } from "../env";

describe("Environment Variables", () => {
  it("should retrieve the API URL from environment variables", () => {
    expect(API_URL).toBe("https://api.themoviedb.org/3/");
  });

  it("should retrieve the poster URL from environment variables", () => {
    expect(POSTER_URL).toBe("https://image.tmdb.org/t/p/w500");
  });

  it("should retrieve the API key for the theme movie from environment variables", () => {
    expect(THEME_MOVIE_API_KEY).toBe("test-key");
  });
});
