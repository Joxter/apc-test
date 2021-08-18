import React, { ChangeEvent, useCallback, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IssueDetails } from "../../UI-components/IssueDetails";
import { useStore } from "effector-react";
import {
  $favIssues,
  $isIssueLoading,
  $issue,
  oneIssueLoadedFail,
  pageClosed,
  pageOpened,
  toggleFav,
} from "../../Model";
import { LoadingWrapper } from "../../UI-components/LoadingWrapper";

oneIssueLoadedFail.watch((res) => alert(res.message));

export const Issue: React.FC = () => {
  const issue = useStore($issue);
  const isLoading = useStore($isIssueLoading);
  const favIssues = useStore($favIssues);
  let { id, repo, owner } = useParams<{ id: string; owner: string; repo: string }>(); // todo make it safety

  useEffect(() => {
    pageOpened({ id, repo, owner });
    return () => pageClosed();
  }, []);

  const onFavChange = useCallback(() => {
    if (issue) {
      toggleFav(issue);
    }
  }, [issue]);

  return (
    <div>
      <LoadingWrapper isLoading={isLoading}>
        {/*todo move to separate component */}
        <label>
          <input type="checkbox" name={id} checked={!!favIssues[id]} onChange={onFavChange} />
          bookmarked
        </label>
        {issue ? <IssueDetails issue={issue} Link={Link} backUrl={`/${owner}/${repo}/issues`} /> : <p>no issue</p>}
      </LoadingWrapper>
    </div>
  );
};
