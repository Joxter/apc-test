import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  $possibleToSubmit,
  $repoName,
  $repoOwner,
  formSubmitted,
  nameEdited,
  ownerEdited,
  fetchFail,
  fetchSuccess,
} from "../../Model";
import { useStore } from "effector-react";
import { InputRepoForm } from "../../UI-components/InputRepoForm";
import { getIssuesUrl } from "../urls";

formSubmitted.watch((ev) => ev.preventDefault());
fetchFail.watch((res) => alert(`Repo ${res.message}`));

export const InputRepo: React.FC = () => {
  let history = useHistory();

  useEffect(() => {
    // do not really like this
    return fetchSuccess.watch(() => history.push(getIssuesUrl()));
  }, []);

  const repoOwner = useStore($repoOwner);
  const repoName = useStore($repoName);
  const isPossibleToFetch = useStore($possibleToSubmit);

  return (
    <div>
      <h1>Issue viewer</h1>
      <InputRepoForm
        onSubmit={formSubmitted}
        ownerName={repoOwner}
        repoName={repoName}
        onOwnerNameChange={ownerEdited}
        onRepoNameChange={nameEdited}
        isSubmitDisabled={!isPossibleToFetch}
      />
    </div>
  );
};
