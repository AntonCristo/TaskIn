import { observer } from "mobx-react";
import { memoUIActions } from "src/actions";
import clearFilterIcon from "src/assets/svg/close_black_24dp.svg";
import { WithTooltip } from "src/shared";
import { memoStore } from "src/stores";

import classes from "./reset-urgency-filter.module.css";

export const ResetUrgencyFilter = observer(() => {
  const { uiStoreInstance } = memoStore;

  const _isUrgencyLevelActiveInFilter =
    !!uiStoreInstance.filterProfile.urgencyLevel?.length;
  const onResetClickHandler = () => {
    memoUIActions.setFilterProfileByKeyAndValue("urgencyLevel");
  };

  return _isUrgencyLevelActiveInFilter ? (
    <WithTooltip tip="Click to reset urgency level filter">
      <img
        onClick={onResetClickHandler}
        className={classes.resetUrgencyFilterIcon}
        src={clearFilterIcon}
        alt="reset-urgency-filter"
      />
    </WithTooltip>
  ) : null;
});
