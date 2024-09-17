import { renderHook, act } from "@testing-library/react";
import { useDebounceCallback } from "../use-debounce-callback";

jest.useFakeTimers();

describe("useDebounceCallback", () => {
  it("should call the debounced callback after the specified delay", () => {
    const callback = jest.fn();
    const delay = 500;

    const { result } = renderHook(() => useDebounceCallback(callback, delay));

    act(() => {
      result.current("test");
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(delay);
    });

    expect(callback).toHaveBeenCalledWith("test");
  });

  //   it("should clear the timeout on unmount", () => {
  //     const callback = jest.fn();
  //     const delay = 500;

  //     const { result, unmount } = renderHook(() =>
  //       useDebounceCallback(callback, delay)
  //     );

  //     act(() => {
  //       result.current("test");
  //     });

  //     unmount();

  //     expect(clearTimeout).toHaveBeenCalled();
  //   });
});
