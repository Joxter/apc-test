import { createEvent, createStore } from "effector";

import { Issue } from "../../Types/types";
import { createEffect } from "effector/compat";
import { getPageFromLinkHeader } from "./utils";

export const $issues = createStore<Issue[]>([]);
export const $currentPage = createStore(1);
export const $totalPages = createStore(1);

export const loadIssues = createEvent<string>();
export const plusPage = createEvent<unknown>();
export const minusPage = createEvent<unknown>();

export const loadIssuesFx = createEffect<{ url: string; page: number }, { pages: number; issues: Issue[] }>(
  async ({ url, page }) => {
    const res = await fetch(`https://api.github.com/repos/${url}/issues?page=${page}`);
    const issues: Issue[] = await res.json();

    return {
      pages: getPageFromLinkHeader(res.headers.get("Link")),
      issues,
    };
  }
);
loadIssuesFx.fail.watch(console.error); // we can use Sentry or anything else as well

export const $isLoading = loadIssuesFx.pending;