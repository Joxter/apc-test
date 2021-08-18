import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { InputRepo } from "./InputRepo";
import { IssuesList } from "./IssuesList";
import { Issue } from "./Issue";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <p>
        <Link to="/">Home</Link>
      </p>
      <Switch>
        <Route path="/" exact>
          <InputRepo />
        </Route>
        <Route path="/:owner/:repo/issues/" exact>
          <IssuesList />
        </Route>
        <Route path="/:owner/:repo/issues/:id" exact>
          <Issue />
        </Route>
        <Route path="*">
          <div>404</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
