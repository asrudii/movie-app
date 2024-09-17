import { updateSearchParams } from "../update-search-params";

describe("updateSearchParams", () => {
  let searchParams: URLSearchParams;

  beforeEach(() => {
    searchParams = new URLSearchParams();
  });

  it("should set the key and delete the page parameter if value is provided", () => {
    searchParams.set("page", "1");
    const result = updateSearchParams("key", "value", searchParams);

    expect(result.get("key")).toBe("value");
    expect(result.has("page")).toBe(false);
  });

  it("should delete the key if value is null", () => {
    searchParams.set("key", "value");
    const result = updateSearchParams("key", null, searchParams);

    expect(result.has("key")).toBe(false);
  });

  it("should delete the key if value is an empty string", () => {
    searchParams.set("key", "value");
    const result = updateSearchParams("key", "", searchParams);

    expect(result.has("key")).toBe(false);
  });

  it("should set the key to the string representation of a number", () => {
    const result = updateSearchParams("key", 123, searchParams);

    expect(result.get("key")).toBe("123");
  });
});
