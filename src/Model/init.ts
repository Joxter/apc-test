import { forward, sample } from "effector";

import { $currentPage, loadIssues, minusPage, plusPage } from "./IssuesList";
import { $loadedRepoFullName, fetchSuccess } from "./InputRepo";
import { loadIssuesFx } from "./IssuesList";
import { $state, toggleClosedState, toggleOpenState, $sorting, sortingFieldClicked } from "./IssueFilters";
import "./InputRepo/init";
import "./IssuesList/init";
import "./IssueFilters/init";

forward({ from: fetchSuccess.map((repo) => repo.full_name), to: loadIssues });

sample({
  source: [$currentPage, $loadedRepoFullName, $state, $sorting],
  clock: [loadIssues, plusPage, minusPage, toggleOpenState, toggleClosedState, sortingFieldClicked],
  fn: ([page, url, state, sorting]) => {
    return { url, page, state, field: sorting.field, direction: sorting.direction };
  },
  target: loadIssuesFx,
});
