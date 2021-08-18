import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IssueDetails } from "../../UI-components/IssueDetails";
import { useStore } from "effector-react";
import { $isIssueLoading, $issue, oneIssueLoadedFail, pageClosed, pageOpened } from "../../Model";
import { LoadingWrapper } from "../../UI-components/LoadingWrapper";

oneIssueLoadedFail.watch((res) => alert(res.message));

export const Issue: React.FC = () => {
  const issue = useStore($issue);
  const isLoading = useStore($isIssueLoading);
  let { id, repo, owner } = useParams<{ id: string; owner: string; repo: string }>(); // todo make it safety

  useEffect(() => {
    pageOpened({ id, repo, owner });
    return () => pageClosed();
  }, []);

  return (
    <div>
      <LoadingWrapper isLoading={isLoading}>
        {issue ? <IssueDetails issue={issue} Link={Link} backUrl={`/${owner}/${repo}/issues`} /> : <p>no issue</p>}
      </LoadingWrapper>
    </div>
  );
};
