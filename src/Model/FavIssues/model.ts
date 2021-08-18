import { createEvent, createStore } from "effector";

import { Issue } from "../../Types/types";

export const $favIssues = createStore<Record<string, string>>({});

export const toggleFav = createEvent<Issue>();
