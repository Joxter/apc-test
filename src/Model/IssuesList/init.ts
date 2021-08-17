import {
  $currentPage,
  $issues,
  $totalPages,
  issuesLoadedFail,
  issuesLoadedSuccess,
  loadIssuesFx,
  minusPage,
  plusPage,
} from "./model";
import { forward, split } from "effector";
import { GithubFetchError, Issue } from "../../Types/types";

$currentPage.on(plusPage, (state) => state + 1).on(minusPage, (state) => state - 1);

const loadIssuesResult = split(loadIssuesFx.doneData, {
  success: (res): res is { pages: number; body: Issue[] } => Array.isArray(res.body),
  fail: (res): res is { pages: number; body: GithubFetchError } => "message" in res.body,
});
forward({ from: loadIssuesResult.fail, to: issuesLoadedFail });
forward({ from: loadIssuesResult.success, to: issuesLoadedSuccess });

$issues.on(loadIssuesResult.success, (s, res) => res.body);
$totalPages.on(loadIssuesResult.success, (s, res) => res.pages);
