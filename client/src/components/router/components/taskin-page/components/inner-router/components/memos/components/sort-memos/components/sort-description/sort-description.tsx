import { observer } from "mobx-react";
import announceIcon from "src/assets/svg/announce_24dp.svg";
import { memoStore } from "src/stores";
import { memosSortingAnnouncments } from "src/constants";

import classes from "./sort-description.module.css";

export const SortDescription = observer(() => {
  const { uiStoreInstance } = memoStore;
  const sortingMethodOrNull = uiStoreInstance.sortingProfile.sort;

  const renderDescriptionBySortingMethod = () => {
    if (!sortingMethodOrNull) {
      return memosSortingAnnouncments.no_sort;
    } else {
      switch (sortingMethodOrNull) {
        case "CREATION_DATE":
          return uiStoreInstance.sortingProfile.sortDirection === "UP"
            ? memosSortingAnnouncments.creation_date_ascending
            : memosSortingAnnouncments.creation_date_descending;
        case "DUE_DATE":
          return uiStoreInstance.sortingProfile.sortDirection === "UP"
            ? memosSortingAnnouncments.due_date_ascending
            : memosSortingAnnouncments.due_date_descending;
        case "TITLE":
          return uiStoreInstance.sortingProfile.sortDirection === "UP"
            ? memosSortingAnnouncments.title_ascending
            : memosSortingAnnouncments.title_descending;
        case "URGENCY_LEVEL":
          return uiStoreInstance.sortingProfile.sortDirection === "UP"
            ? memosSortingAnnouncments.urgency_level_ascending
            : memosSortingAnnouncments.urgency_level_decending;
        default:
          break;
      }
    }

    return null;
  };

  return (
    <div className={classes.sortDescription}>
      <div className={classes.descriptionBox}>
        <img src={announceIcon} alt="announce-icon" />
        <b>{renderDescriptionBySortingMethod()}</b>
      </div>
    </div>
  );
});
