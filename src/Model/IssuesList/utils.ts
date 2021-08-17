import parse from "parse-link-header";

export function getPageFromLinkHeader(header: string | null) {
  if (!header) return 1;
  const data = parse(header);
  return data && data.last && +data.last.page || 1;
}
