import { useState, MouseEvent } from "react";
import { observer } from "mobx-react";
import { memoStore, SortingOption } from "src/stores";
import {
  memoUIActions,
  notificationActions,
  routerLocationSetter,
} from "src/actions";
import { Button, Switch } from "src/shared";
import refreshIcon from "src/assets/svg/refresh_24dp.svg";
import doneIcon from "src/assets/svg/done_24dp.svg";
import returnIcon from "src/assets/svg/return_24dp.svg";

import { SortingOptionItem } from "./components";

import classes from "./sort-memos.module.css";

export const SortMemos = observer(() => {
  const { uiStoreInstance } = memoStore;
  const _sortingDirectionOptions: [string, string] = ["DOWN", "UP"];
  const _sortingRules: SortingOption[] = ["CREATION_DATE", "DUE_DATE", "TITLE"];
  const [sortDirectionLocal, setSortDirectionLocal] = useState(
    uiStoreInstance.sortingProfile.sortDirection
  );
  const [sortingRuleLocal, setSortingRuleLocal] = useState(
    uiStoreInstance.sortingProfile.sort
  );

  const popResetSortConfirmation = () => {
    notificationActions.popNotificationForUser(
      "Reset sort?",
      `Are you sure you want to reset this sort?`,
      resetSortHandler
    );
  };

  const resetSortHandler = () => {
    memoUIActions.setMemosSortingProfile(null, "DOWN");
    routerLocationSetter("/taskin/memos");
  };

  const popApplySortConfirmation = () => {
    notificationActions.popNotificationForUser(
      "Apply sort?",
      `Are you sure you want to apply this sort?`,
      applySortHandler
    );
  };

  const applySortHandler = () => {
    memoUIActions.setMemosSortingProfile(sortingRuleLocal, sortDirectionLocal);
    routerLocationSetter("/taskin/memos");
  };

  const returnToMemosPageHandler = () => {
    routerLocationSetter("/taskin/memos");
  };

  const toggleSortingDirection = () => {
    if (sortDirectionLocal === "UP") {
      setSortDirectionLocal("DOWN");
    } else {
      setSortDirectionLocal("UP");
    }
  };

  const onSortingOptionClickedLocalHandler = (
    event: MouseEvent<HTMLDivElement>
  ) => {
    const clickedRule = event.currentTarget.getAttribute(
      "data-rule"
    ) as SortingOption;

    sortingRuleLocal === clickedRule
      ? setSortingRuleLocal(null)
      : setSortingRuleLocal(clickedRule);
  };

  return (
    <div className={classes.sortMemosWrapper}>
      <div className={classes.header}>
        <Button
          icon={returnIcon}
          title="Return"
          onClick={returnToMemosPageHandler}
        />
        <Button
          icon={refreshIcon}
          title="Reset"
          onClick={popResetSortConfirmation}
        />
        <Button
          icon={doneIcon}
          title="Apply"
          onClick={popApplySortConfirmation}
        />
      </div>
      <div className={classes.sortDirectionPicker}>
        <div>Choose ascending/descending:</div>
        <div>
          <Switch
            onChange={toggleSortingDirection}
            switchValues={_sortingDirectionOptions}
            value={sortDirectionLocal}
          />
          <div>
            {sortDirectionLocal === "DOWN" ? "Descending" : "Ascending"}
          </div>
        </div>
      </div>
      <div className={classes.sortingOptionItemsList}>
        <div>Choose sorting method:</div>
        {_sortingRules.map((sortingRule, index) => (
          <SortingOptionItem
            onClick={onSortingOptionClickedLocalHandler}
            isSelcted={sortingRuleLocal === sortingRule}
            rule={sortingRule}
            key={sortingRule! + index}
          />
        ))}
      </div>
    </div>
  );
});
