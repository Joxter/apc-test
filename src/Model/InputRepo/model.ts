import { combine, createEffect, createEvent, createStore } from "effector";
import { ChangeEvent, FormEvent } from "react";
import { Repo, GithubFetchError } from "../../Types/types";

export const $repoOwner = createStore("facebook");
export const $repoName = createStore("react");

export const ownerEdited = createEvent<ChangeEvent<HTMLInputElement>>();
export const nameEdited = createEvent<ChangeEvent<HTMLInputElement>>();
export const formSubmitted = createEvent<FormEvent<HTMLFormElement>>();

export const fetchSuccess = createEvent<Repo>();
export const fetchFail = createEvent<GithubFetchError>();

export const fetchReposFx = createEffect<[string, string], Repo | GithubFetchError>(async ([repoOwner, repoName]) => {
  return fetch(`https://api.github.com/repos/${repoOwner}/${repoName}`).then((res) => res.json());
});
fetchReposFx.fail.watch(console.error); // we can use Sentry or anything else as well

export const $possibleToSubmit = combine($repoOwner, $repoName, fetchReposFx.pending, (repoOwner, repoName, pending) => {
  return !pending && repoOwner !== "" && repoName !== "";
});
