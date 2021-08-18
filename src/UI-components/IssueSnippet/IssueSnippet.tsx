import React from "react";
import { Link } from "react-router-dom";

import { Issue } from "../../Types/github";

import css from "./IssueSnippet.module.css";

type Props = {
  issue: Issue;
  baseUrl: string;
  Link: React.ComponentType<{ to: string }>;
};

export const IssueSnippet = React.memo<Props>(({ issue, Link, baseUrl }) => {
  const info = `${issue.state}, ${issue.comments} comments, ${issue.updated_at}`; // todo make it nicer

  return (
    <div className={css.root}>
      <h2>
        <Link to={`${baseUrl}/${issue.number}`}>Issue #{issue.number}</Link>
      </h2>
      <p>{issue.title}</p>
      <span className={css.info}>({info})</span>
    </div>
  );
});
