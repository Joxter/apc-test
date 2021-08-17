import { createEvent, createStore } from "effector";
import { ChangeEvent } from "react";
import { IssueState } from "../../Types/types";

export const $state = createStore(IssueState.Open);

export const toggleOpenState = createEvent<ChangeEvent<HTMLInputElement>>();
export const toggleClosedState = createEvent<ChangeEvent<HTMLInputElement>>();
