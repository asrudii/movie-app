import Movie from "@/components/movie";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <Movie />
    </Suspense>
  );
}
