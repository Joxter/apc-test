import React from "react";
import { SortDirection, SortField } from "../../Types/types";

import css from "./IssueSort.module.css";

type Props = {
  sorting: {
    field: SortField;
    direction: SortDirection;
  };
  onChange: (value: SortField) => unknown;
};

export const IssueSort = React.memo<Props>(({ sorting, onChange }) => {
  const { field, direction } = sorting;
  const directionIcon = direction === SortDirection.Asc ? " ↑" : " ↓";

  return (
    <div className={css.root}>
      Sort:
      <button onClick={() => onChange(SortField.Created)} type="button">
        created{field === SortField.Created ? directionIcon : ""}
      </button>
      <button onClick={() => onChange(SortField.Updated)} type="button">
        updated{field === SortField.Updated ? directionIcon : ""}
      </button>
      <button onClick={() => onChange(SortField.Comments)} type="button">
        comments{field === SortField.Comments ? directionIcon : ""}
      </button>
    </div>
  );
});
