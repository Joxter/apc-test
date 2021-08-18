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

formSubmitted.watch((ev) => ev.preventDefault());
fetchFail.watch((res) => alert(res.message));

export const InputRepo: React.FC = () => {
  let history = useHistory();

  useEffect(() => {
    return fetchSuccess.watch(({ full_name }) => history.push(`${full_name}/issues`));
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
