import React, { ChangeEvent } from "react";

type Props = {
  onSubmit: () => unknown;
  ownerName: string;
  repoName: string;
  onOwnerNameChange: (ev: ChangeEvent<HTMLInputElement>) => unknown;
  onRepoNameChange: (ev: ChangeEvent<HTMLInputElement>) => unknown;
  isSubmitDisabled: boolean;
};

export const InputRepoForm: React.FC<Props> = ({
  onSubmit,
  isSubmitDisabled,
  onRepoNameChange,
  onOwnerNameChange,
  ownerName,
  repoName,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <p>
        <label>
          Repo owner <input type="text" value={ownerName} onChange={onOwnerNameChange} />
        </label>
      </p>
      <p>
        <label>
          Repo name <input type="text" value={repoName} onChange={onRepoNameChange} />
        </label>
      </p>
      <button type="submit" disabled={isSubmitDisabled}>
        open
      </button>
    </form>
  );
};
