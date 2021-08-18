import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "effector-react";

import { IssueSnippet } from "../../UI-components/IssueSnippet";
import { $issues, $isLoading, issuesLoadedFail, issuesListPageOpened, issuesListPageClosed } from "../../Model";
import { LoadingWrapper } from "../../UI-components/LoadingWrapper";
import { Header } from "./Header";

issuesLoadedFail.watch((res) => alert(res.body.message));

export const IssuesList: React.FC = () => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();

  useEffect(() => {
    issuesListPageOpened({ owner, repo });
    return () => issuesListPageClosed();
  }, []);

  const issues = useStore($issues);
  const isLoading = useStore($isLoading);

  const baseUrl = `/${owner}/${repo}/issues`;

  return (
    <div>
      <h1>Issues for {repo}</h1>
      <LoadingWrapper isLoading={isLoading}>
        <Header baseUrl={baseUrl} />
        {issues.map((issue) => {
          return <IssueSnippet baseUrl={baseUrl} issue={issue} key={issue.id} Link={Link} />;
        })}
      </LoadingWrapper>
    </div>
  );
};
