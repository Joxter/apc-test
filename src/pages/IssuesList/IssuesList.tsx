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
} from "../../Model";
import { Pagination } from "../../UI-components/Pagination";
import { LoadingWrapper } from "../../UI-components/LoadingWrapper";
import { IssueStateFilter } from "../../UI-components/IssueStateFilter/IssueStateFilter";

export const IssuesList: React.FC = () => {
  const repoName = useStore($repoName);
  const issues = useStore($issues);
  const isLoading = useStore($isLoading);
  const totalPages = useStore($totalPages);
  const currentPage = useStore($currentPage);
  const state = useStore($state);

  return (
    <div>
      <h1>Issues for {repoName}</h1>
      <LoadingWrapper isLoading={isLoading}>
        <IssueStateFilter onOpenChange={toggleOpenState} onClosedChange={toggleClosedState} value={state} />
        <Pagination onPlus={plusPage} current={currentPage} onMinus={minusPage} total={totalPages} />
        {issues.map((issue) => {
          return <IssueSnippet issue={issue} key={issue.id} Link={Link} />;
        })}
      </LoadingWrapper>
    </div>
  );
};
