import * as React from "react";
import { Link } from "react-router-dom";
import { useStore } from "effector-react";

import { IssueSnippet } from "../../UI-components/IssueSnippet";
import { $repoName } from "../../Model";

export const IssuesList: React.FC = () => {
  const repoName = useStore($repoName);

  return (
    <div>
      <h1>Issues for {repoName}</h1>
      <IssueSnippet title={"my name"} id={"2"} url={"/dfsdf"} Link={Link} />
    </div>
  );
};
