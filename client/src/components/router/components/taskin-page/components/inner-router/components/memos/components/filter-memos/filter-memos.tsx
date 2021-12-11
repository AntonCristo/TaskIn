import { Box, Button } from "src/shared";
import returnIcon from "src/assets/svg/return_24dp.svg";
import refreshIcon from "src/assets/svg/refresh_24dp.svg";
import {
  memoUIActions,
  notificationActions,
  routerLocationSetter,
} from "src/actions";
import { browserEventUtils } from "src/utils";

import { UrgencyFilter } from "./components";

import classes from "./filter-memos.module.css";
import { memoStore } from "src/stores";

const buttonStyleOVerride = {
  border: "none",
};

export const FilterMemos = () => {
  const returnToMemosPageHandler = () => {
    routerLocationSetter("/taskin/memos");
  };

  const ResetFilterHandler = () => {
    memoStore.dataStoreInstance.memosDisplayClass !== "IN_PROGRESS" &&
      memoUIActions.setMemosDisplayClass("IN_PROGRESS");
    memoUIActions.clearFilterProfileByKey("urgencyLevel");
    returnToMemosPageHandler();
  };

  const popResetSortConfirmation = () => {
    notificationActions.popNotificationForUser(
      "",
      `Are you sure you want to reset this filter?`,
      ResetFilterHandler
    );
  };

  return (
    <Box>
      <div
        onClick={browserEventUtils.preventParentClickEventHandler}
        className={classes.filterContainer}
      >
        <div className={classes.filterHeader}>
          <Button
            styleOverride={buttonStyleOVerride}
            icon={returnIcon}
            title="Close"
            onClick={returnToMemosPageHandler}
          />
          <Button
            styleOverride={buttonStyleOVerride}
            icon={refreshIcon}
            title="Reset"
            onClick={popResetSortConfirmation}
          />
        </div>
        <div className={classes.filerBody}>
          <UrgencyFilter />
        </div>
      </div>
    </Box>
  );
};
