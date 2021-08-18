import {
  $currentPage,
  $issues,
  $repoParams,
  $totalPages,
  issuesListPageClosed,
  issuesListPageOpened,
  issuesLoadedFail,
  issuesLoadedSuccess,
  loadIssuesFx,
  minusPage,
  plusPage,
} from "./model";
import { forward, split } from "effector";
import { GithubFetchError, Issue } from "../../Types/types";

const loadIssuesResult = split(loadIssuesFx.doneData, {
  success: (res): res is { pages: number; body: Issue[] } => Array.isArray(res.body),
  fail: (res): res is { pages: number; body: GithubFetchError } => "message" in res.body,
});
forward({ from: loadIssuesResult.fail, to: issuesLoadedFail });
forward({ from: loadIssuesResult.success, to: issuesLoadedSuccess });

$issues.on(loadIssuesResult.success, (s, res) => res.body).reset(issuesListPageClosed);
$totalPages.on(loadIssuesResult.success, (s, res) => res.pages).reset(issuesListPageClosed);

$repoParams
  .on(issuesListPageOpened, (state, { repo, owner }) => {
    return { repo, owner };
  })
  .reset(issuesListPageClosed);

$currentPage
  .on(plusPage, (state) => state + 1)
  .on(minusPage, (state) => state - 1)
  .reset(issuesListPageClosed);
