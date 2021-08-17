import { createEvent, createStore, createEffect } from "effector";

import { GithubFetchError, Issue, IssueState } from "../../Types/types";
import { getPageFromLinkHeader } from "./utils";

export const $issues = createStore<Issue[]>([]);
export const $currentPage = createStore(1);
export const $totalPages = createStore(1);

export const loadIssues = createEvent<string>();
export const plusPage = createEvent();
export const minusPage = createEvent();
export const issuesLoadedSuccess = createEvent<{ pages: number; body: Issue[] }>();
export const issuesLoadedFail = createEvent<{ pages: number; body: GithubFetchError }>();

type LoadIssuesParams = {
  url: string;
  page: number;
  state: IssueState;
};
export const loadIssuesFx = createEffect<LoadIssuesParams, { pages: number; body: Issue[] | GithubFetchError }>(
  async ({ url, page, state }) => {
    const res = await fetch(`https://api.github.com/repos/${url}/issues?page=${page}&state=${state}`);
    const body: Issue[] = await res.json();

    return {
      pages: getPageFromLinkHeader(res.headers.get("Link")),
      body,
    };
  }
);
loadIssuesFx.fail.watch(console.error); // we can use Sentry or anything else as well

export const $isLoading = loadIssuesFx.pending;
