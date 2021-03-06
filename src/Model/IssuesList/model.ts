import { createEvent, createStore, createEffect } from "effector";

import { GithubFetchError, Issue, IssueState, SortDirection, SortField } from "../../Types/github";
import { getPageFromLinkHeader } from "./utils";
import { queryFromObject } from "../../utils/url";

export const $repoParams = createStore<{ owner: string; repo: string }>({ owner: "", repo: "" });
export const $issues = createStore<Issue[]>([]);
export const $currentPage = createStore(1); // todo reduce currentPage if totalPages became small
export const $totalPages = createStore(1);

export const loadIssues = createEvent<string>();
export const issuesListPageOpened = createEvent<{ owner: string; repo: string }>();
export const issuesListPageClosed = createEvent();
export const plusPage = createEvent();
export const minusPage = createEvent();
export const issuesLoadedSuccess = createEvent<{ pages: number; body: Issue[] }>();
export const issuesLoadedFail = createEvent<{ pages: number; body: GithubFetchError }>();

type LoadIssuesParams = {
  repoParams: { owner: string; repo: string };
  page: number;
  state: IssueState;
  field: SortField;
  direction: SortDirection;
};
export const loadIssuesFx = createEffect<LoadIssuesParams, { pages: number; body: Issue[] | GithubFetchError }>(
  async ({ repoParams, page, state, field, direction }) => {
    // todo need to create better way for the real production, no logic must be here
    let query = queryFromObject({ page, state, field, direction });
    const res = await fetch(`https://api.github.com/repos/${repoParams.owner}/${repoParams.repo}/issues?${query}`);
    const body: Issue[] = await res.json();

    return {
      pages: getPageFromLinkHeader(res.headers.get("Link")),
      body,
    };
  }
);
loadIssuesFx.fail.watch(console.error); // we can use Sentry or anything else as well

export const $isLoading = loadIssuesFx.pending;
