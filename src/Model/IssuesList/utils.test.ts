import { getPageFromLinkHeader } from "./utils";

describe("getPageFromLinkHeader", () => {
  it("should return 1 if no header", () => {
    expect(getPageFromLinkHeader(null)).toBe(1);
  });

  it("should return number if everything fine", () => {
    expect(
      getPageFromLinkHeader(
        '<https://api.github.com/repositories/10270250/issues?page=2>; rel="next", <https://api.github.com/repositories/10270250/issues?page=27>; rel="last"\n'
      )
    ).toBe(27);
  });

  it("should return 0 if something is broken", () => {
    expect(getPageFromLinkHeader("1234")).toBe(1);
    expect(
      getPageFromLinkHeader(
        '<https://api.github.com/repositorirel="next", <https://api.github.com/repositories/10 rel="last"\n'
      )
    ).toBe(1);
    expect(getPageFromLinkHeader('<https://api.github.com/repositories/10270250/issues?page=2>; rel="next"\n')).toBe(1);
  });
});
