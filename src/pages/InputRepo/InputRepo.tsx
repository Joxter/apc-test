import * as React from "react";
import {
  $possibleToSubmit,
  $repoName,
  $repoOwner,
  formSubmitted,
  nameEdited,
  ownerEdited,
  fetchFail,
} from "../../Model";
import { useStore } from "effector-react";

formSubmitted.watch((ev) => ev.preventDefault());
fetchFail.watch((res) => alert(`Repo ${res.message}`));

export const InputRepo: React.FC = () => {
  const repoOwner = useStore($repoOwner);
  const repoName = useStore($repoName);
  const possibleToFetch = useStore($possibleToSubmit);

  return (
    <div>
      InputRepo
      <form onSubmit={formSubmitted}>
        <p>
          <label>
            Repo owner
            <input type="text" value={repoOwner} onChange={ownerEdited} />
          </label>
        </p>
        <p>
          <label>
            Repo owner
            <input type="text" value={repoName} onChange={nameEdited} />
          </label>
        </p>
        <button type="submit" disabled={!possibleToFetch}>
          view issues
        </button>
      </form>
    </div>
  );
};
