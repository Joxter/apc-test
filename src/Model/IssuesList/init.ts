import { $currentPage, $issues, $totalPages, loadIssuesFx, minusPage, plusPage } from "./model";

$issues.on(loadIssuesFx.doneData, (s, res) => res.issues);
$totalPages.on(loadIssuesFx.doneData, (s, res) => res.pages);

$currentPage.on(plusPage, (state) => state + 1).on(minusPage, (state) => state - 1);

loadIssuesFx.doneData.watch(console.log);
$issues.watch(console.log);
