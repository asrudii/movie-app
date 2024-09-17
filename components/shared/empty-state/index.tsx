import { AxiosError } from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Loader } from "react-feather";
import "./style.scoped.scss";

interface IEmptyStateProps {
  isLoading?: boolean;
  isNotFound?: boolean;
  error?: AxiosError<Error> | null;
}

const EmptyState = ({ isLoading, error, isNotFound }: IEmptyStateProps) => {
  // get search query from URL
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  // handle if no data found
  if (isNotFound)
    return (
      <div className="empty-state">
        <h3 className="empty-state__title">No data found</h3>
        <Image
          src="/images/no-data.jpg"
          alt="No data available"
          width={400}
          height={400}
        />
      </div>
    );

  // handle loading state
  if (isLoading)
    return (
      <div className="empty-state">
        <Loader size={32} className="animate-spin text-primary" />
        Loading...
      </div>
    );

  // handle error state
  if (error)
    return (
      <div className="empty-state">
        <h3 className="empty-state__title">Error | {error?.status}</h3>
        <span>{error?.response?.data?.message}</span>
        <Image
          src="/images/error.jpg"
          alt="No data available"
          width={400}
          height={400}
        />
      </div>
    );

  // handle initial state
  if (!search)
    return (
      <div className="empty-state">
        <h3 className="empty-state__title">
          Search movie <br />
          using searchbar above
        </h3>
        <Image
          src="/images/search.jpg"
          alt="No data available"
          width={400}
          height={400}
        />
      </div>
    );
};

export default EmptyState;
