import { createEffect, forward, split, Event } from "effector";
import { GithubFetchError } from "../Types/types";

// todo not ready, need to manage with headers for pagination.
//      idea: create separated "createGithubPaginationEffect" function
export function createGithubEffect<Params, Ok>(
  fetchFn: (params: Params) => Promise<Ok | GithubFetchError>,
  successEv: Event<Ok>,
  failEv: Event<GithubFetchError>
) {
  const effect = createEffect<Params, Ok | GithubFetchError>(fetchFn);
  effect.fail.watch(console.error); // we can use Sentry or anything else as well

  const splitted = split(effect.doneData, {
    fail: (res): res is GithubFetchError => "message" in res,
  });

  forward({ from: splitted.fail, to: failEv });
  forward({ from: splitted.__ as Event<Ok>, to: successEv });

  return { effect, success: splitted.__ as Event<Ok>, fail: splitted.fail };
}
