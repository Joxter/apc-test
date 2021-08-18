import { $favIssues, toggleFav } from "./model";

$favIssues.on(toggleFav, (state, { number, title }) => {
  if (state[number]) {
    let newState = { ...state };
    delete newState[number];
    return newState;
  }

  return {
    ...state,
    [number]: title,
  };
});
