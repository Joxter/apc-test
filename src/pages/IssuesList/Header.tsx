import React from "react";
import { useStore } from "effector-react";
import { Link } from "react-router-dom";

import { IssueStateFilter } from "../../UI-components/IssueStateFilter/IssueStateFilter";
import {
  $currentPage,
  $favIssues,
  $sorting,
  $state,
  $totalPages,
  minusPage,
  plusPage,
  sortingFieldClicked,
  toggleClosedState,
  toggleOpenState,
} from "../../Model";
import { IssueSort } from "../../UI-components/IssueSort/IssueSort";
import { Pagination } from "../../UI-components/Pagination";

export const Header = React.memo<{ baseUrl: string }>(({ baseUrl }) => {
  const totalPages = useStore($totalPages);
  const currentPage = useStore($currentPage);
  const state = useStore($state);
  const sorting = useStore($sorting);
  const favIssues = useStore($favIssues);

  return (
    <>
      <IssueStateFilter onOpenChange={toggleOpenState} onClosedChange={toggleClosedState} value={state} />
      <IssueSort onChange={sortingFieldClicked} sorting={sorting} />
      <Pagination onPlus={plusPage} current={currentPage} onMinus={minusPage} total={totalPages} />
      <p>Bookmarked issues:</p>
      <ul>
        {Object.entries(favIssues).map(([id, title]) => {
          return (
            <li>
              <Link to={`${baseUrl}/${id}`}>#{id} {title}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
});
