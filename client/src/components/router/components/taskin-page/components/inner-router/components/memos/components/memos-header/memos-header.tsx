import { CSSProperties } from "react";
import { observer } from "mobx-react";
import { memoUIActions, memosCrudActions } from "src/actions";
import { Button, ControlledInput } from "src/shared";
import { memoStore } from "src/stores";
import newMemoIcon from "src/assets/svg/add_circle_24dp.svg";
import filterIcon from "src/assets/svg/filter_list_24dp.svg";
import sortIcon from "src/assets/svg/sort_24dp.svg";
import searchIcon from "src/assets/svg/search_24dp.svg";
import clearTextIcon from "src/assets/svg/close_black_24dp.svg";

import classes from "./memos-header.module.css";

export const MemosHeader = observer(() => {
  const { uiStoreInstance } = memoStore;

  const headerButtonStyleOverride: CSSProperties = {
    border: "none",
  };

  const searchMemoTextChangeHandler = (typedValue: string) => {
    memoUIActions.onChangeMemoSearchText(typedValue);
  };

  const clearMemoTextSearchHandler = () => {
    memoUIActions.onChangeMemoSearchText("");
  };

  const addNewMemoToMapWithoutValidation = () => {
    //TODO:this method should open a wizard dialog with validation inside
    const newMemoUUID = memosCrudActions.addNewValidatedMemoToMap();
    memoUIActions.initSingleMemoCollapseState(newMemoUUID);
  };

  return (
    <div className={classes.memosHeader}>
      <div className={classes.headerButtons}>
        <Button
          styleOverride={headerButtonStyleOverride}
          title="New Memo"
          icon={newMemoIcon}
          onClick={addNewMemoToMapWithoutValidation}
        />
        <Button
          styleOverride={headerButtonStyleOverride}
          title="Filter"
          icon={filterIcon}
          onClick={() => {}}
        />
        <Button
          styleOverride={headerButtonStyleOverride}
          title="Sort"
          icon={sortIcon}
          onClick={() => {}}
        />
      </div>
      <div className={classes.searchInputWrapper}>
        <Button
          styleOverride={{ ...headerButtonStyleOverride, width: "86px" }}
          title={uiStoreInstance.memoSearchText ? "Clear" : "Search"}
          icon={uiStoreInstance.memoSearchText ? clearTextIcon : searchIcon}
          onClick={
            uiStoreInstance.memoSearchText
              ? clearMemoTextSearchHandler
              : memoUIActions.toggleSearchBoxVisibility
          }
        />
        {uiStoreInstance.isSearchBoxVisible ? (
          <ControlledInput
            autoFocus={uiStoreInstance.isSearchBoxVisible}
            placeholder="memos title..."
            value={uiStoreInstance.memoSearchText}
            onChange={searchMemoTextChangeHandler}
          />
        ) : null}
      </div>
    </div>
  );
});
