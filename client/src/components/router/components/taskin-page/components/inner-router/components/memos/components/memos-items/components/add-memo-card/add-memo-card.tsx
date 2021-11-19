import { observer } from "mobx-react";
import { memosCrudActions, memoUIActions } from "src/actions";
import plussIcon from "src/assets/svg/add_24dp.svg";
import { memoStore } from "src/stores";

import classes from "./add-memo-card.module.css";

export const AddMemoCard = observer(() => {
  const { dataStoreInstance } = memoStore;
  const showAddMemoCard =
    dataStoreInstance.memosDisplayClass !== "TRASH" &&
    dataStoreInstance.memosDisplayClass !== "COMPLETED";

  const addNewMemoToMapWithoutValidation = () => {
    const newMemoUUID = memosCrudActions.addNewValidatedMemoToMap();
    memoUIActions.initSingleMemoCollapseState(newMemoUUID);
    memoUIActions.calculateSingleMemoUrgencyLevelColor(newMemoUUID);
  };

  return showAddMemoCard ? (
    <div
      onClick={addNewMemoToMapWithoutValidation}
      className={classes.addMemoCard}
    >
      <div>ADD</div>
      <img src={plussIcon} alt="add" />
    </div>
  ) : null;
});
