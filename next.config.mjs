/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    THEME_MOVIE_API_KEY: process.env.THEME_MOVIE_API_KEY,
  },
  images: {
    domains: ["image.tmdb.org"],
  },
};

export default nextConfig;
