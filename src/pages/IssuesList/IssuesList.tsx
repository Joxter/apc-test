import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "effector-react";

import { IssueSnippet } from "../../UI-components/IssueSnippet";
import {
  $currentPage,
  $issues,
  $repoName,
  $totalPages,
  $isLoading,
  minusPage,
  plusPage,
  $state,
  toggleClosedState,
  toggleOpenState,
  issuesLoadedFail,
  sortingFieldClicked,
  $sorting,
} from "../../Model";
import { Pagination } from "../../UI-components/Pagination";
import { LoadingWrapper } from "../../UI-components/LoadingWrapper";
import { IssueStateFilter } from "../../UI-components/IssueStateFilter/IssueStateFilter";
import { IssueSort } from "../../UI-components/IssueSort/IssueSort";

issuesLoadedFail.watch((res) => alert(res.body.message));

export const IssuesList: React.FC = () => {
  const repoName = useStore($repoName);
  const issues = useStore($issues);
  const isLoading = useStore($isLoading);
  const totalPages = useStore($totalPages);
  const currentPage = useStore($currentPage);
  const state = useStore($state);
  const sorting = useStore($sorting);

  return (
    <div>
      <h1>Issues for {repoName}</h1>
      <LoadingWrapper isLoading={isLoading}>
        <IssueStateFilter onOpenChange={toggleOpenState} onClosedChange={toggleClosedState} value={state} />
        <IssueSort onChange={sortingFieldClicked} sorting={sorting} />
        <Pagination onPlus={plusPage} current={currentPage} onMinus={minusPage} total={totalPages} />
        {issues.map((issue) => {
          return <IssueSnippet issue={issue} key={issue.id} Link={Link} />;
        })}
      </LoadingWrapper>
    </div>
  );
};
