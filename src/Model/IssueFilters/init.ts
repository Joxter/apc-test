import { $state, toggleClosedState, toggleOpenState } from "./model";
import { IssueState } from "../../Types/types";

$state
  .on(toggleClosedState, (state) => {
    return {
      [IssueState.All]: IssueState.Open,
      [IssueState.Open]: IssueState.All,
      [IssueState.Closed]: IssueState.Closed,
    }[state];
  })
  .on(toggleOpenState, (state) => {
    return {
      [IssueState.All]: IssueState.Closed,
      [IssueState.Closed]: IssueState.All,
      [IssueState.Open]: IssueState.Open,
    }[state];
  });
