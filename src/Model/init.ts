import { forward, sample } from "effector";

import { $currentPage, $repoParams, issuesListPageOpened, loadIssues, minusPage, plusPage } from "./IssuesList";
import { loadIssuesFx } from "./IssuesList";
import { $state, toggleClosedState, toggleOpenState, $sorting, sortingFieldClicked } from "./IssueFilters";
import { $favIssues } from "./FavIssues";
import { fetchSuccess } from "./InputRepo";
import "./InputRepo/init";
import "./IssuesList/init";
import "./IssueFilters/init";
import "./OneIssue/init";
import "./FavIssues/init";

$favIssues.reset(fetchSuccess);

sample({
  source: [$currentPage, $repoParams, $state, $sorting],
  clock: [issuesListPageOpened, plusPage, minusPage, toggleOpenState, toggleClosedState, sortingFieldClicked],
  fn: ([page, repoParams, state, sorting]) => {
    return { repoParams, page, state, ...sorting };
  },
  target: loadIssuesFx,
});
