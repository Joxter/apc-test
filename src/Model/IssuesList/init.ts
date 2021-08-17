import { sample } from "effector";
import { $currentPage, $issues, $totalPages, loadIssues, loadIssuesFx, minusPage, plusPage } from "./model";
import { $loadedRepoFullName } from "../InputRepo";

$issues.on(loadIssuesFx.doneData, (s, res) => res.issues);
$totalPages.on(loadIssuesFx.doneData, (s, res) => res.pages);

loadIssuesFx.doneData.watch(console.log);

sample({
  source: [$currentPage, $loadedRepoFullName],
  clock: [loadIssues, plusPage, minusPage],
  fn: ([page, url]) => {
    return { page, url };
  },
  target: loadIssuesFx,
});

$currentPage.on(plusPage, (state) => state + 1).on(minusPage, (state) => state - 1);

$issues.watch(console.log);
