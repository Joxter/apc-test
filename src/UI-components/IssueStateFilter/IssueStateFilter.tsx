import React, { ChangeEvent } from "react";
import { IssueState } from "../../Types/types";

import css from "./IssueStateFilter.module.css";

type Props = {
  value: IssueState;
  onOpenChange: (value: ChangeEvent<HTMLInputElement>) => unknown;
  onClosedChange: (value: ChangeEvent<HTMLInputElement>) => unknown;
};

export const IssueStateFilter = React.memo<Props>(({ value, onOpenChange, onClosedChange }) => {
  return (
    <div className={css.root}>
      State:
      <label>
        <input
          type="checkbox"
          checked={value === IssueState.Open || value === IssueState.All}
          name={IssueState.Open}
          onChange={onOpenChange}
        />
        open
      </label>
      <label>
        <input
          type="checkbox"
          checked={value === IssueState.Closed || value === IssueState.All}
          name={IssueState.Closed}
          onChange={onClosedChange}
        />
        closed
      </label>
    </div>
  );
});
