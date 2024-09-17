// Retrieving the API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Retrieving the poster URL from environment variables
const POSTER_URL = process.env.NEXT_PUBLIC_POSTER_URL;

// Retrieving the API key for the theme movie from environment variables
const THEME_MOVIE_API_KEY = process.env.THEME_MOVIE_API_KEY;

// Exporting the API URL and API key for use in other parts of the application
export { API_URL, POSTER_URL, THEME_MOVIE_API_KEY };
