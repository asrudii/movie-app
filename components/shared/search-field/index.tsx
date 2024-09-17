"use client";

import { updateSearchParams } from "@/core/utils/update-search-params";
import { NextComponentType } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useRef } from "react";
import { Search, X } from "react-feather";
import { useDebounceCallback } from "../../../core/hooks/use-debounce-callback";
import "./style.scoped.scss";

const SearchField: NextComponentType = (
  props: React.InputHTMLAttributes<HTMLInputElement>
): React.JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams);
  const search = urlSearchParams.get("search") || "";

  // change the search query in the URL
  const handleChangeKeyword = useDebounceCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (value === search) return;
      replace(
        `${pathname}?${updateSearchParams("search", value, urlSearchParams)}`
      );
    },
    500
  );

  // reset the search query in the URL
  const handleResetSearch = () => {
    if (search) {
      replace(`${pathname}`);
      inputRef.current?.value && (inputRef.current.value = "");
    }
  };

  return (
    <div className="search-field">
      <Search color="black" size={20} className="search-field__icon" />
      <input
        ref={inputRef}
        className="search-field__input"
        type="text"
        onChange={handleChangeKeyword}
        placeholder="Search..."
        defaultValue={search}
        {...props}
      />
      {search && (
        <button data-testid="reset-search-btn" className="search-field__clear" onClick={handleResetSearch}>
          {<X color="black" size={20} />}
        </button>
      )}
    </div>
  );
};

export default SearchField;
