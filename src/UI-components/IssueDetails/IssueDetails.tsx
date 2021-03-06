import React from "react";
import { Link } from "react-router-dom";

import { Issue } from "../../Types/github";

import css from "./IssueDetails.module.css";

type Props = {
  issue: Issue;
  backUrl: string;
  Link: React.ComponentType<{ to: string }>;
};

export const IssueDetails = React.memo<Props>(({ issue, Link, backUrl }) => {
  const info = `${issue.state}, ${issue.updated_at}`; // todo make it nicer

  return (
    <div className={css.root}>
      <Link to={backUrl}>back to issues list</Link>
      <h2>
        Issue {issue.number} {issue.title}
      </h2>
      <p>{info}</p>
      <p>User: {issue.user.login}</p>
      <p>Labels: {issue.labels.map(label => `[${label.name}]`).join(', ')}</p>
      <p>{issue.body}</p>
      <p>comments: {issue.comments}</p>
    </div>
  );
});
