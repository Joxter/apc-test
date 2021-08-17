import { forward } from "effector";
import { loadIssues } from "./IssuesList";
import { fetchSuccess } from "./InputRepo";
import "./InputRepo/init";
import "./IssuesList/init";

forward({ from: fetchSuccess.map((repo) => repo.full_name), to: loadIssues });
