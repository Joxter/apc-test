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
  const info = `${issue.state}, ${issue.comments} comments, ${issue.updated_at}`; // todo make it nicer

  return (
    <div className={css.root}>
      <h2>
        <Link to={getIssueUrl(issue.id)}>Issue #{issue.number}</Link>
      </h2>
      <p>{issue.title}</p>
      <span className={css.info}>({info})</span>
    </div>
  );
});
