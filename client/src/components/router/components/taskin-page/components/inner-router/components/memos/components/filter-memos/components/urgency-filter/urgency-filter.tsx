import { observer } from "mobx-react";
import { memoUIActions } from "src/actions";
import { MemoUrgencyState, UrgencyColor } from "src/client-types";
import { memoStore } from "src/stores";
import { setSessionPersistedUIState } from "src/utils";

import { UrgencyListItem } from "./components";

import classes from "./urgency-filter.module.css";

export const UrgencyFilter = observer(() => {
  const { uiStoreInstance } = memoStore;

  const urgencyColors: MemoUrgencyState[] = [
    { color: UrgencyColor.Low, urgency: "LOW" },
    { color: UrgencyColor.Medium, urgency: "MEDIUM" },
    { color: UrgencyColor.High, urgency: "HIGH" },
  ];

  //TODO: find references of usage and move to seperate file of encapsulated procedures by context
  const toggleUrgencyColorAsFilter = (urgencyColor: UrgencyColor) => {
    memoStore.dataStoreInstance.memosDisplayClass !== "IN_PROGRESS" &&
      memoUIActions.setMemosDisplayClass("IN_PROGRESS");
    memoUIActions.setFilterProfileByKeyAndValue("urgencyLevel", urgencyColor);
    setSessionPersistedUIState({
      MEMO_UI_STORE: [
        { key: "FILTER", value: memoStore.uiStoreInstance.filterProfile },
      ],
    });
  };

  return (
    <div className={classes.urgencyFilter}>
      <div>By urgency level:</div>
      <ul>
        {urgencyColors.map((uc, index) => (
          <UrgencyListItem
            key={uc.color + index}
            urgency={uc}
            onClick={toggleUrgencyColorAsFilter}
            isSelected={
              !!uiStoreInstance.filterProfile.urgencyLevel?.includes(uc.color)
            }
          />
        ))}
      </ul>
    </div>
  );
});
