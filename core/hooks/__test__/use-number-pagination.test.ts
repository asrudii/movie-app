import { renderHook, act } from "@testing-library/react";
import useNumberPagination from "../use-number-pagination";

describe("useNumberPagination", () => {
  const maxNumberRender = 5;

  it("should render number pagination 1 to 6 with active page 1", () => {
    const btnList = [1, 2, 3, 4, 5, "...", 10];
    const { result } = renderHook(() =>
      useNumberPagination({ page: 1, totalPage: 6 })
    );

    expect(result.current.isLessThanSeven()).toBe(true);
    expect(
      result.current.isPageBetweenEightToTenAndFirstActive({
        maxNumberRender,
        btnList,
      })
    ).toBe(true);
    expect(
      result.current.isBetweenTenToMoreThanTenAndLastActive({ maxNumberRender })
    ).toBe(false);
    expect(
      result.current.isBetweenTenToMoreThanTenAndFirstActive({
        maxNumberRender,
      })
    ).toBe(false);
    expect(
      result.current.isAtMiddleActive({
        maxNumberRender,
      })
    ).toBe(false);
    expect(result.current.createNormalNo()).toEqual([1, 2, 3, 4, 5, 6]);
    expect(
      result.current.createHideNoAtLast({
        maxNumberRender,
      })
    ).toEqual([1, 2, 3, 4, 5, "...", 6]);
  });

  it("should render number pagination 1 to 20 with active page 10", () => {
    const btnList = [1, 2, 3, 4, 5, "...", 20];

    const { result } = renderHook(() =>
      useNumberPagination({ page: 10, totalPage: 20 })
    );

    expect(result.current.isLessThanSeven()).toBe(false);
    expect(
      result.current.isPageBetweenEightToTenAndFirstActive({
        maxNumberRender,
        btnList,
      })
    ).toBe(false);
    expect(
      result.current.isBetweenTenToMoreThanTenAndLastActive({ maxNumberRender })
    ).toBe(false);
    expect(
      result.current.isBetweenTenToMoreThanTenAndFirstActive({
        maxNumberRender,
      })
    ).toBe(false);
    expect(
      result.current.isAtMiddleActive({
        maxNumberRender,
      })
    ).toBe(true);
    expect(result.current.createNormalNo()).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ]);
    expect(
      result.current.createHideNoAtLast({
        maxNumberRender,
      })
    ).toEqual([1, 2, 3, 4, 5, "...", 20]);
    expect(result.current.createHideNoAtFirstAndLast()).toEqual([
      1,
      0,
      9,
      10,
      11,
      "...",
      20,
    ]);
  });

  it("should render number pagination 1 to 10 with active page 10", () => {
    const btnList = [10];
    const { result } = renderHook(() =>
      useNumberPagination({ page: 10, totalPage: 10 })
    );

    expect(result.current.isLessThanSeven()).toBe(false);
    expect(
      result.current.isPageBetweenEightToTenAndFirstActive({
        maxNumberRender,
        btnList,
      })
    ).toBe(false);
    expect(
      result.current.isBetweenTenToMoreThanTenAndLastActive({ maxNumberRender })
    ).toBe(false);
    expect(
      result.current.isBetweenTenToMoreThanTenAndFirstActive({
        maxNumberRender,
      })
    ).toBe(false);
    expect(
      result.current.isAtMiddleActive({
        maxNumberRender,
      })
    ).toBe(false);
    expect(result.current.createNormalNo()).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    expect(
      result.current.isPageBetweenEightToTenAndLastActive({
        maxNumberRender,
        btnList,
      })
    ).toBe(true);
    expect(
      result.current.createHideNoAtFirst({
        maxNumberRender,
        btnList,
      })
    ).toEqual([1, "...", 5, 6, 7, 8, 9, 10, 10]);
  });
});
