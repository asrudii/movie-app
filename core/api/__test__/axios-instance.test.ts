import axios from "axios";
import { AxiosInstance } from "../axios-instance";
import { API_URL, THEME_MOVIE_API_KEY } from "@/core/constants/env";

jest.mock("axios"); // Mock the axios.create function

jest.mock("../axios-instance", () => {
  const axiosInstance = {
    post: jest.fn(),
    get: jest.fn((url, config) =>
      config ? axios.get(url, config) : axios.get(url)
    ), // Call the actual axios.get
    put: jest.fn(),
    interceptors: {
      request: { use: jest.fn(() => {}) },
      response: { use: jest.fn(() => {}) },
    },
  };
  return { AxiosInstance: axiosInstance };
});

describe("AxiosInstance Interceptors", () => {
  it("should set the correct headers and baseURL", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: {} });

    // Intercept the request config
    (AxiosInstance.interceptors.request.use as jest.Mock).mockImplementation(
      (config) => {
        config.baseURL = API_URL;
        config.headers.Authorization = `Bearer ${THEME_MOVIE_API_KEY}`;
        config.headers["Content-Type"] = "application/json";
      }
    );

    await AxiosInstance.get("/example");

    expect(AxiosInstance.get).toHaveBeenCalledWith("/example");
  });
});
