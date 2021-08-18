import {
  $possibleToSubmit,
  $repoOwner,
  $repoName,
  fetchReposFx,
  resetInputRepo,
  ownerEdited,
  formSubmitted,
  nameEdited,
  fetchSuccess, fetchFail,
} from "./model";
import "./init";

describe(`test "/owner/repo/issues" page`, () => {
  const originUse = fetchReposFx.use.getCurrent();
  beforeEach(() => {
    fetchReposFx.use(originUse);
    resetInputRepo();
  });

  it('$possibleToSubmit should be "false" if inputs are empty`', () => {
    expect($repoOwner.getState()).toBe("");
    expect($repoName.getState()).toBe("");
    expect($possibleToSubmit.getState()).toBe(false);
  });

  it("user can fill in inputs", () => {
    $repoOwner.setState("");
    $repoName.setState("");

    ownerEdited({ target: { value: "facebook" } });
    expect($repoOwner.getState()).toBe("facebook");

    nameEdited({ target: { value: "react" } });
    expect($repoName.getState()).toBe("react");
  });

  it("$possibleToSubmit should be true once inputs are filled in", () => {
    $repoOwner.setState("facebook");
    $repoName.setState("react");

    expect($possibleToSubmit.getState()).toBe(true);
  });

  it("fetchSuccess should be emited if repo exists", () => {
    $repoOwner.setState("facebook");
    $repoName.setState("react");
    fetchReposFx.use(() => {
      return {
        full_name: "mocked_repo",
      };
    });

    const fetchReposFxWatcher = jest.fn();
    const unsubscribe1 = fetchReposFx.watch(fetchReposFxWatcher);
    const fetchSuccessWatcher = jest.fn();
    const unsubscribe2 = fetchSuccess.watch(fetchSuccessWatcher);

    formSubmitted();

    // checking effect args
    expect(fetchReposFxWatcher.mock.calls.length).toBe(1);
    expect(fetchReposFxWatcher.mock.calls[0][0]).toEqual(["facebook", "react"]);

    expect(fetchSuccessWatcher.mock.calls.length).toBe(1);
    expect(fetchSuccessWatcher.mock.calls[0][0]).toEqual({ full_name: "mocked_repo" });

    unsubscribe1();
    unsubscribe2();
  });

  it("fetchFail should be emited if repo doesn't exists", () => {
    $repoOwner.setState("foo");
    $repoName.setState("bar");
    fetchReposFx.use(() => {
      return { message: "Not Found" };
    });

    const fetchFailWatcher = jest.fn();
    const unsubscribe1 = fetchFail.watch(fetchFailWatcher);

    formSubmitted();

    expect(fetchFailWatcher.mock.calls.length).toBe(1);
    expect(fetchFailWatcher.mock.calls[0][0]).toEqual({ message: "Not Found" });

    unsubscribe1();
  });
});
