import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { cn } from "../class-merge"; 

jest.mock("clsx");
jest.mock("tailwind-merge");

describe("cn utility function", () => {
  it("should call clsx and twMerge with the correct arguments", () => {
    const mockInput: ClassValue[] = ["input1", "input2"]; // Type annotation for mockInput
    const mockClsxResult = "clsx-result";
    const mockTwMergeResult = "twMerge-result";

    (clsx as jest.Mock).mockReturnValue(mockClsxResult);
    (twMerge as jest.Mock).mockReturnValue(mockTwMergeResult);

    const result = cn(...mockInput);

    expect(clsx).toHaveBeenCalledWith(mockInput);
    expect(twMerge).toHaveBeenCalledWith(mockClsxResult);
    expect(result).toBe(mockTwMergeResult);
  });
});