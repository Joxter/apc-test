import { forward, sample } from "effector";

import { $currentPage, loadIssues, minusPage, plusPage } from "./IssuesList";
import { $loadedRepoFullName, fetchSuccess } from "./InputRepo";
import { loadIssuesFx } from "./IssuesList";
import { $state, toggleClosedState, toggleOpenState } from "./IssueFilters";
import "./InputRepo/init";
import "./IssuesList/init";
import "./IssueFilters/init";

forward({ from: fetchSuccess.map((repo) => repo.full_name), to: loadIssues });

sample({
  source: [$currentPage, $loadedRepoFullName, $state],
  clock: [loadIssues, plusPage, minusPage, toggleOpenState, toggleClosedState],
  fn: ([page, url, state]) => {
    return { page, url, state };
  },
  target: loadIssuesFx,
});
