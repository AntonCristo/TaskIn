import { CSSProperties } from "react";
import { observer } from "mobx-react";
import {
  memoUIActions,
  memosCrudActions,
  setDropdownMenuByNameOrNull,
  routerLocationSetter,
} from "src/actions";
import { Button, ControlledInput } from "src/shared";
import { memoStore } from "src/stores";
import newMemoIcon from "src/assets/svg/add_circle_24dp.svg";
import filterIcon from "src/assets/svg/filter_list_24dp.svg";
import sortIcon from "src/assets/svg/sort_24dp.svg";
import searchIcon from "src/assets/svg/search_24dp.svg";
import clearTextIcon from "src/assets/svg/close_black_24dp.svg";
import moreIcon from "src/assets/svg/more_vert_24dp.svg";

import classes from "./memos-header.module.css";

export const MemosHeader = observer(() => {
  const { uiStoreInstance, dataStoreInstance } = memoStore;
  const _memosDisplayClass = dataStoreInstance.memosDisplayClass;

  const buttonStylesOverride: { [x: string]: CSSProperties } = {
    headerButton: {
      border: "none",
      width: "96px",
    },
    headerMenuButton: {
      border: "none",
      minWidth: "30px",
      marginLeft: "auto",
      marginRight: "16px",
    },
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
    memoUIActions.calculateSingleMemoUrgencyLevelState(newMemoUUID);
  };

  const onMoreActionsMenuClicked = () => {
    setDropdownMenuByNameOrNull("/taskin/memos-memosMenu");
  };

  const onSortButtonClickedHandler = () => {
    routerLocationSetter("/taskin/memos/sort");
  };

  return (
    <div className={classes.memosHeader}>
      <div className={classes.headerButtons}>
        <Button
          isDisabled={
            _memosDisplayClass === "TRASH" || _memosDisplayClass === "COMPLETED"
          }
          styleOverride={buttonStylesOverride.headerButton}
          title="Memo"
          icon={newMemoIcon}
          onClick={addNewMemoToMapWithoutValidation}
        />
        {/* //TODO: if filter is selcetd, icon should be replaced to refresh icon */}
        <Button
          styleOverride={buttonStylesOverride.headerButton}
          title="Filter"
          icon={filterIcon}
          onClick={() => {}}
        />

        <Button
          styleOverride={buttonStylesOverride.headerButton}
          title="Sort"
          icon={sortIcon}
          onClick={onSortButtonClickedHandler}
        />
      </div>
      <div className={classes.searchInputWrapper}>
        <Button
          styleOverride={buttonStylesOverride.headerButton}
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
        <Button
          styleOverride={buttonStylesOverride.headerMenuButton}
          icon={moreIcon}
          title=""
          onClick={onMoreActionsMenuClicked}
        />
      </div>
    </div>
  );
});
