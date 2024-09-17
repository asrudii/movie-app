import React from "react";
import { cn } from "@/core/utils/class-merge";
import useNumberPagination from "@/core/hooks/use-number-pagination";
import { ChevronLeft, ChevronRight } from "react-feather";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import "./style.scoped.scss";

interface IPagination {
  totalPage: number | undefined;
  page: number;
}

const Pagination = ({ totalPage = 1, page }: IPagination) => {
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChangePage = (
    e: React.MouseEvent<HTMLButtonElement>,
    value: number | string
  ) => {
    if (value === page || !value) return;
    urlSearchParams.set("page", value.toString());
    replace(`${pathname}?${urlSearchParams}`);
  };

  const {
    isLessThanSeven,
    isPageBetweenEightToTenAndFirstActive,
    isPageBetweenEightToTenAndLastActive,
    isBetweenTenToMoreThanTenAndFirstActive,
    isBetweenTenToMoreThanTenAndLastActive,
    isAtMiddleActive,
    createNormalNo,
    createHideNoAtLast,
    createHideNoAtFirst,
    createHideNoAtFirstAndLast,
  } = useNumberPagination({ totalPage, page });

  // pagination number function
  const renderPagination = () => {
    let btnList: string[] | number[] = [];

    // max number for render each page
    const maxNumberRender = 5;

    // condition for pagination number
    if (isLessThanSeven()) {
      btnList = createNormalNo();
    } else if (
      isPageBetweenEightToTenAndFirstActive({ maxNumberRender, btnList })
    ) {
      btnList = createHideNoAtLast({ maxNumberRender });
    } else if (
      isPageBetweenEightToTenAndLastActive({ maxNumberRender, btnList })
    ) {
      btnList = createHideNoAtFirst({ maxNumberRender, btnList });
    } else if (isBetweenTenToMoreThanTenAndFirstActive({ maxNumberRender })) {
      btnList = createHideNoAtLast({ maxNumberRender });
    } else if (isBetweenTenToMoreThanTenAndLastActive({ maxNumberRender })) {
      btnList = createHideNoAtFirst({ maxNumberRender, btnList });
    } else if (isAtMiddleActive({ maxNumberRender })) {
      btnList = createHideNoAtFirstAndLast();
    }

    return btnList?.map((item: number | string) => (
      <button
        key={item}
        disabled={item === 0 || item === "..."}
        className={cn(
          "pagination__item",
          page === item ? "pagination__item__active" : "bg-transparent"
        )}
        onClick={(e) => handleChangePage && handleChangePage(e, item)}
      >
        {item === 0 ? "..." : item}
      </button>
    ));
  };

  return (
    <div className="pagination">
      <button
        data-testid="pagination-prev"
        disabled={page === 1}
        className="pagination__prev"
        onClick={(e) => handleChangePage && handleChangePage(e, page - 1)}
      >
        <ChevronLeft size={20} />
      </button>
      <div className="flex items-center">{renderPagination()}</div>
      <button
        data-testid="pagination-next"
        disabled={page === totalPage}
        className="pagination__next"
        onClick={(e) => handleChangePage && handleChangePage(e, page + 1)}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
