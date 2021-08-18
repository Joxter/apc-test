import React from "react";
import { Link } from "react-router-dom";

import { Issue } from "../../Types/types";

import css from "./IssueSnippet.module.css";

type Props = {
  issue: Issue;
  backUrl: string;
  Link: React.ComponentType<{ to: string }>;
};

export const IssueSnippet = React.memo<Props>(({ issue, Link, backUrl }) => {
  const info = `${issue.state}, ${issue.comments} comments, ${issue.updated_at}`; // todo make it nicer

  return (
    <div className={css.root}>
      <h2>
        <Link to={`${backUrl}/issues/${issue.number}`}>Issue #{issue.number}</Link>
      </h2>
      <p>{issue.title}</p>
      <span className={css.info}>({info})</span>
    </div>
  );
});
