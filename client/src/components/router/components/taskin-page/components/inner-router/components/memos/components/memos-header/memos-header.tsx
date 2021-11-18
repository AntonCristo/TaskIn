import { CSSProperties } from "react";
import { observer } from "mobx-react";
import { memoUIActions, setDropdownMenuByNameOrNull } from "src/actions";
import { Button, ControlledInput } from "src/shared";
import { memoStore } from "src/stores";
import searchIcon from "src/assets/svg/search_24dp.svg";
import clearTextIcon from "src/assets/svg/close_black_24dp.svg";
import moreIcon from "src/assets/svg/more_vert_24dp.svg";

import classes from "./memos-header.module.css";

export const MemosHeader = observer(() => {
  const { uiStoreInstance } = memoStore;

  const buttonStylesOverride: { [x: string]: CSSProperties } = {
    headerButton: {
      border: "none",
      minWidth: "20px",
      marginRight: "3px",
    },
    headerMenuButton: {
      border: "none",
      minWidth: "20px",
      marginLeft: "auto",
      marginRight: "5px",
    },
  };

  const searchMemoTextChangeHandler = (typedValue: string) => {
    memoUIActions.onChangeMemoSearchText(typedValue);
  };

  const clearMemoTextSearchHandler = () => {
    memoUIActions.onChangeMemoSearchText("");
  };

  const onMoreActionsMenuClicked = () => {
    setDropdownMenuByNameOrNull("/taskin/memos-memosMenu");
  };

  return (
    <div className={classes.memosHeader}>
      <div className={classes.searchInputWrapper}>
        <Button
          styleOverride={buttonStylesOverride.headerButton}
          title=""
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
