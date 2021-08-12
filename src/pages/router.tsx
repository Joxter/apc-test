import React from "react";
import { LoginProcess } from "../auth/GithubAuth";

export const Router: React.FC = () => {
  return (
    <div>
      issues
      <div>
        <LoginProcess />
      </div>
    </div>
  );
};
