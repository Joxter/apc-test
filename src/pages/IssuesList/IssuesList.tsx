import * as React from "react";
import { Link } from "react-router-dom";
import { useStore } from "effector-react";

import { IssueSnippet } from "../../UI-components/IssueSnippet";
import { $currentPage, $repoName, $totalPages } from "../../Model";
import { minusPage, plusPage } from "../../Model/IssuesList/model";

export const IssuesList: React.FC = () => {
  const repoName = useStore($repoName);
  const totalPages = useStore($totalPages);
  const currentPage = useStore($currentPage);

  return (
    <div>
      <h1>Issues for {repoName}</h1>
      <IssueSnippet title={"my name"} id={"2"} url={"/dfsdf"} Link={Link} />
      <p>
        {/* todo move minusPage/plusPage liminantions into the Model */}
        page:{" "}
        <button onClick={minusPage} type="button" disabled={currentPage === 1}>
          -
        </button>{" "}
        {currentPage}{" "}
        <button onClick={plusPage} type="button" disabled={currentPage === totalPages}>
          +
        </button>
      </p>
    </div>
  );
};
