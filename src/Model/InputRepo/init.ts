import { forward, guard, split } from "effector";
import {
  $possibleToSubmit,
  $repoName,
  $repoOwner,
  fetchFail,
  fetchReposFx,
  fetchSuccess,
  formSubmitted,
  nameEdited,
  ownerEdited,
  resetInputRepo,
} from "./model";
import { GithubFetchError, Repo } from "../../Types/github";

$repoOwner.on(ownerEdited, (s, ev) => ev.target.value).reset(resetInputRepo);
$repoName.on(nameEdited, (s, ev) => ev.target.value).reset(resetInputRepo);

guard({
  source: [$repoOwner, $repoName],
  clock: formSubmitted,
  filter: $possibleToSubmit,
  target: fetchReposFx,
});

const fetchReposResult = split(fetchReposFx.doneData, {
  success: (res): res is Repo => "full_name" in res,
  fail: (res): res is GithubFetchError => "message" in res,
});
forward({ from: fetchReposResult.fail, to: fetchFail });
forward({ from: fetchReposResult.success, to: fetchSuccess });
