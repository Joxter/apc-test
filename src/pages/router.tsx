import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { InputRepo } from "./InputRepo";
import { IssuesList } from "./IssuesList";
import { Issue } from "./Issue";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/issues">Issues</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/" exact>
          <InputRepo />
        </Route>
        <Route path="/issues" exact>
          <IssuesList />
        </Route>
        <Route path="/issues/:id" exact>
          <Issue />
        </Route>
        <Route path="*">
          <div>404</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
