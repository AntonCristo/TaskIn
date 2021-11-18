import { CSSProperties } from "react";
import { observer } from "mobx-react";
import {
  memoUIActions,
  memosCrudActions,
  setDropdownMenuByNameOrNull,
  routerLocationSetter,
  notificationActions,
} from "src/actions";
import { Button, ControlledInput } from "src/shared";
import { memoStore } from "src/stores";
import newMemoIcon from "src/assets/svg/add_circle_24dp.svg";
import filterIcon from "src/assets/svg/filter_list_24dp.svg";
import sortIcon from "src/assets/svg/sort_24dp.svg";
import searchIcon from "src/assets/svg/search_24dp.svg";
import clearTextIcon from "src/assets/svg/close_black_24dp.svg";
import moreIcon from "src/assets/svg/more_vert_24dp.svg";
import clearTrashIcon from "src/assets/svg/delete_forever_24dp.svg";

import classes from "./memos-header.module.css";

export const MemosHeader = observer(() => {
  const { uiStoreInstance, dataStoreInstance } = memoStore;
  const _memosDisplayClass = dataStoreInstance.memosDisplayClass;
  const _isSortActive = uiStoreInstance.sortingProfile.sort;
  const _showNewMemoButton = !(_memosDisplayClass === "TRASH");
  const _isNewMemoButtonDisabled =
    _memosDisplayClass === "COMPLETED" || _memosDisplayClass === "TRASH";

  const buttonStylesOverride: { [x: string]: CSSProperties } = {
    headerButton: {
      border: "none",
      width: "96px",
      marginRight: "3px",
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
    const newMemoUUID = memosCrudActions.addNewValidatedMemoToMap();
    memoUIActions.initSingleMemoCollapseState(newMemoUUID);
    memoUIActions.calculateSingleMemoUrgencyLevelColor(newMemoUUID);
  };

  const onMoreActionsMenuClicked = () => {
    setDropdownMenuByNameOrNull("/taskin/memos-memosMenu");
  };

  const onSortButtonClickedHandler = () => {
    routerLocationSetter("/taskin/memos/sort");
  };

  const popClearTrashConfirmation = () => {
    notificationActions.popNotificationForUser(
      "Clear trash ?",
      "Are you sure you want to clear your deleted memos ?",
      memosCrudActions.deleteMemosLocatedInTrash
    );
  };

  return (
    <div className={classes.memosHeader}>
      <div className={classes.headerButtons}>
        {_showNewMemoButton ? (
          <Button
            isDisabled={_isNewMemoButtonDisabled}
            styleOverride={buttonStylesOverride.headerButton}
            title="Memo"
            icon={newMemoIcon}
            onClick={addNewMemoToMapWithoutValidation}
          />
        ) : (
          <Button
            styleOverride={buttonStylesOverride.headerButton}
            title="Clear"
            icon={clearTrashIcon}
            onClick={popClearTrashConfirmation}
          />
        )}

        <Button
          styleOverride={buttonStylesOverride.headerButton}
          title="Filter"
          icon={filterIcon}
          onClick={() => {}}
        />

        <Button
          styleOverride={{
            ...buttonStylesOverride.headerButton,
            border: _isSortActive ? "1px solid #73bfa1" : "none",
          }}
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
