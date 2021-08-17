import React from "react";

type Props = {
  total: number;
  onPlus: () => unknown;
  onMinus: () => unknown;
  current: number;
};

export const Pagination = React.memo<Props>(({ total, onPlus, onMinus, current }) => {
  return (
    <p>
      page:{" "}
      <button onClick={onMinus} type="button" disabled={current === 1}>
        -
      </button>{" "}
      {current}/{total}{" "}
      <button onClick={onPlus} type="button" disabled={current === total}>
        +
      </button>
    </p>
  );
});
