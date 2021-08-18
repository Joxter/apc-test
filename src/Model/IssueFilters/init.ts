import { $sorting, $state, sortingFieldClicked, toggleClosedState, toggleOpenState } from "./model";
import { IssueState, SortDirection } from "../../Types/types";

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

$sorting.on(sortingFieldClicked, (state, field) => {
  if (state.field === field) {
    return {
      field: state.field,
      direction: state.direction === SortDirection.Desc ? SortDirection.Asc : SortDirection.Desc,
    };
  }

  return {
    field: field,
    direction: SortDirection.Desc,
  };
});
