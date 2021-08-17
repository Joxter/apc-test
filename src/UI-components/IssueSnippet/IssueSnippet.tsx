import React from "react";
import { Link } from "react-router-dom";

import { Issue } from "../../Types/types";
import { getIssueUrl } from "../../pages/urls";

import css from "./IssueSnippet.module.css";

type Props = {
  issue: Issue;
  Link: React.ComponentType<{ to: string }>;
};

export const IssueSnippet = React.memo<Props>(({ issue, Link }) => {
  return (
    <div className={css.root}>
      <h2>
        <Link to={getIssueUrl(issue.id)}>Issue #{issue.number}</Link>
      </h2>
      {issue.title} <span className={css.state}>({issue.state})</span>
    </div>
  );
});
