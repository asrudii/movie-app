"use client";

import { POSTER_URL } from "@/core/constants/env";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./style.scoped.scss";

interface IMovieCardProps {
  image: string;
  id: string | number;
  title: string;
  release: string;
  isLoading?: boolean;
}

const MovieCard = ({
  image,
  id,
  title,
  release,
}: IMovieCardProps): React.JSX.Element => {
  // handle image loading
  // const [loaded, setLoaded] = React.useState(false);
  // const handleLoad = () => setLoaded(true);

  // set image source
  const imageSrc = image ? `${POSTER_URL}${image}` : "/images/no-image.jpg";

  return (
    <div className="card-movie-container">
      <Link href={`/movie/${id}`}>
        <div className="img-wrapper">
          {/* {!loaded && <Skeleton className="w-full !m-0 !p-0 aspect-[4/6]" />} */}
          <Image
            src={imageSrc}
            alt="movie image"
            width={500}
            height={750}
            loading="lazy"
            // onLoad={handleLoad}
          />
        </div>
        <h2 title={title}>{title}</h2>
      </Link>
      <span>Release : {release}</span>
    </div>
  );
};

export default MovieCard;
