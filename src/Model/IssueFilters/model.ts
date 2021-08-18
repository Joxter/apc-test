import { createEvent, createStore } from "effector";
import { ChangeEvent } from "react";
import { IssueState, SortDirection, SortField } from "../../Types/types";

export const $state = createStore(IssueState.Open);
export const $sorting = createStore({ field: SortField.Created, direction: SortDirection.Desc });

export const toggleOpenState = createEvent<ChangeEvent<HTMLInputElement>>();
export const toggleClosedState = createEvent<ChangeEvent<HTMLInputElement>>();
export const sortingFieldClicked = createEvent<SortField>();
