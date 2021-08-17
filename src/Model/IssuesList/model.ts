import { createEvent, createStore, createEffect } from "effector";

import { Issue, IssueState } from "../../Types/types";
import { getPageFromLinkHeader } from "./utils";

export const $issues = createStore<Issue[]>([]);
export const $currentPage = createStore(1);
export const $totalPages = createStore(1);

export const loadIssues = createEvent<string>();
export const plusPage = createEvent();
export const minusPage = createEvent();

type LoadIssuesParams = {
  url: string;
  page: number;
  state: IssueState;
};
export const loadIssuesFx = createEffect<LoadIssuesParams, { pages: number; issues: Issue[] }>(
  async ({ url, page, state }) => {
    const res = await fetch(`https://api.github.com/repos/${url}/issues?page=${page}&state=${state}`);
    const issues: Issue[] = await res.json();

    return {
      pages: getPageFromLinkHeader(res.headers.get("Link")),
      issues,
    };
  }
);
loadIssuesFx.fail.watch(console.error); // we can use Sentry or anything else as well

export const $isLoading = loadIssuesFx.pending;
