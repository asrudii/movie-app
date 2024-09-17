import { AxiosInstance } from "../../api/axios-instance";
import movieService from "../movie.service";

jest.mock("../../api/axios-instance");

describe("movieService", () => {
  it("should call AxiosInstance.get with the correct URL", async () => {
    const params = { query: "Test", page: "1" };
    const mockResponse = { data: { results: [] } };
    (AxiosInstance.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await movieService.search(params);

    console.log(new URLSearchParams(params));

    expect(AxiosInstance.get).toHaveBeenCalledWith(`/search/movie`, {
      params: new URLSearchParams(params),
    });
    expect(result).toBe(mockResponse);
  });

  it("should handle errors correctly", async () => {
    const params = { query: "Inception", page: "1" };
    const mockError = new Error("Network Error");
    (AxiosInstance.get as jest.Mock).mockRejectedValue(mockError);

    await expect(movieService.search(params)).rejects.toThrow("Network Error");
  });
});
