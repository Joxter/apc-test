import { oneIssueLoadedSuccess, oneIssueLoadedFail, loadOneIssueFx, $issue, pageClosed, pageOpened } from "./model";
import { forward, sample, split } from "effector";
import { GithubFetchError, Issue } from "../../Types/types";

const loadOneIssueResult = split(loadOneIssueFx.doneData, {
  success: (res): res is Issue => "id" in res,
  fail: (res): res is GithubFetchError => "message" in res,
});
forward({ from: loadOneIssueResult.fail, to: oneIssueLoadedFail });
forward({ from: loadOneIssueResult.success, to: oneIssueLoadedSuccess });

$issue.on(oneIssueLoadedSuccess, (s, res) => res).reset(pageClosed);

sample({
  clock: pageOpened,
  fn: ({ id, repo, owner }) => {
    return { number: id, repo, owner };
  },
  target: loadOneIssueFx,
});
