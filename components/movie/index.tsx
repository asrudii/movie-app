"use client";

import movieService from "@/core/services/movie.service";
import { AxiosError, AxiosResponse } from "axios";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import "./style.scoped.scss";

// import lazy loaded components
const Pagination = dynamic(() => import("@/components/shared/pagination"));
const MovieCard = dynamic(() => import("@/components/shared/movie-card"));
const EmptyState = dynamic(() => import("@/components/shared/empty-state"));

export default function Movie() {
  // get search query from URL
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || "1";

  // fetch movies
  const { isLoading, error, data } = useQuery<
    AxiosResponse<ISearchMovieResponse>,
    AxiosError<Error>
  >({
    queryKey: ["movie", search, page],
    queryFn: () => movieService.search({ query: search, page }),
    enabled: !!search,
    refetchOnWindowFocus: false,
  });
  const movies = data?.data?.results || [];
  const moviesMeta = data?.data || ({} as ISearchMovieResponse);
  const isNotFound = movies.length === 0 && !!search && !error && !isLoading;

  return (
    <main className="content-container">
      {movies.length > 0 && (
        <>
          <div className="content-title">
            <h6>Search found</h6>
            <span className="text-primary">|</span>
            <span className="text-secondary-200">{search}</span>
          </div>
          <div className="movie-container">
            {movies.map((movie: IMovieData) => (
              <MovieCard
                key={movie?.id}
                image={movie?.poster_path}
                id={movie?.id}
                title={movie?.title}
                release={movie?.release_date}
              />
            ))}
          </div>
          <Pagination
            totalPage={moviesMeta?.total_pages}
            page={moviesMeta?.page}
          />
        </>
      )}
      <EmptyState isLoading={isLoading} error={error} isNotFound={isNotFound} />
    </main>
  );
}
