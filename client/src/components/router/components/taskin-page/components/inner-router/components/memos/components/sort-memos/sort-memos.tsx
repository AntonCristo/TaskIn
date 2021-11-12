import { useState } from "react";
import { observer } from "mobx-react";
import { memoStore } from "src/stores";
import { routerLocationSetter } from "src/actions";
import { Button, Switch } from "src/shared";
import refreshIcon from "src/assets/svg/refresh_24dp.svg";
import doneIcon from "src/assets/svg/done_24dp.svg";
import returnIcon from "src/assets/svg/return_24dp.svg";

import { SortingOptionItem } from "./components";

import classes from "./sort-memos.module.css";
import { SortingOption } from "src/stores/memos-store/memos-ui-store";

export const SortMemos = observer(() => {
  const { uiStoreInstance } = memoStore;
  const _sortingDirection = uiStoreInstance.sortingProfile.sortDirection;
  const _sortingDirectionOptions: ("UP" | "DONW")[] = ["DONW", "UP"];
  const _sortingRules: SortingOption[] = ["CREATION_DATE", "DUE_DATE", "TITLE"];
  const [sortDirectionLocal, setSortDirectionLocal] =
    useState(_sortingDirection);

  const resetSortHandler = () => {
    alert("clear sorting profile");
    routerLocationSetter("/taskin/memos");
  };

  const applySortHandler = () => {
    alert("apply local state to sorting profile");
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

  return (
    <div className={classes.sortMemosWrapper}>
      <div className={classes.header}>
        <Button
          icon={returnIcon}
          title="Return"
          onClick={returnToMemosPageHandler}
        />
        <Button icon={refreshIcon} title="Reset" onClick={resetSortHandler} />
        <Button icon={doneIcon} title="Apply" onClick={applySortHandler} />
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
          <SortingOptionItem key={sortingRule! + index} />
        ))}
      </div>
    </div>
  );
});
