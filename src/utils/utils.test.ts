import { queryFromObject } from "./url";

describe("queryFromObject", () => {
  it("should works", () => {
    expect(queryFromObject({ foo: "abc", bar: "456", baz: "абв" })).toBe("foo=abc&bar=456&baz=%D0%B0%D0%B1%D0%B2");
    expect(queryFromObject({ foo: "!@#$^", bar: true, baz: null })).toBe("foo=%21%40%23%24%5E&bar=true&baz=null");
  });
});
