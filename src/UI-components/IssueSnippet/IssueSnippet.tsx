import * as React from "react";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  id: string;
  url: string;
  Link: React.ComponentType<{ to: string }>;
};

export const IssueSnippet: React.FC<Props> = ({ title, url, id, Link }) => {
  return (
    <div>
      <p>Issue #{id}</p>
      <Link to={url}>{title}</Link>
    </div>
  );
};
