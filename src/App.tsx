import React from "react";
import ReactDOM from "react-dom";

import { AuthProvider } from "./auth/GithubAuth";
import { Router } from "./pages/router";

ReactDOM.render(
  <AuthProvider>
    <Router />
  </AuthProvider>,
  document.getElementById("root")
);
