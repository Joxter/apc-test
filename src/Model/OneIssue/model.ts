import { createEvent, createStore, createEffect } from "effector";

import { GithubFetchError, Issue } from "../../Types/types";

export const $issue = createStore<Issue | null>(null);

export const pageOpened = createEvent<{ id: string; repo: string; owner: string }>();
export const pageClosed = createEvent();

export const oneIssueLoadedSuccess = createEvent<Issue>();
export const oneIssueLoadedFail = createEvent<GithubFetchError>();

type LoadIssuesParams = {
  owner: string;
  repo: string;
  number: string | number;
};
export const loadOneIssueFx = createEffect<LoadIssuesParams, Issue | GithubFetchError>(
  async ({ owner, repo, number }) => {
    return fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${number}`).then((res) => res.json());
  }
);
loadOneIssueFx.fail.watch(console.error); // we can use Sentry or anything else as well

export const $isIssueLoading = loadOneIssueFx.pending;
