import { forward, guard, split } from "effector";
import {
  $loadedRepoFullName,
  $possibleToSubmit,
  $repoName,
  $repoOwner,
  fetchFail,
  fetchReposFx,
  fetchSuccess,
  formSubmitted,
  nameEdited,
  ownerEdited,
} from "./model";
import { GithubFetchError, Repo } from "../../Types/types";

$repoOwner.on(ownerEdited, (s, ev) => ev.target.value);
$repoName.on(nameEdited, (s, ev) => ev.target.value);

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
forward({ from: fetchReposResult.success.map((repo) => repo.full_name), to: $loadedRepoFullName });
