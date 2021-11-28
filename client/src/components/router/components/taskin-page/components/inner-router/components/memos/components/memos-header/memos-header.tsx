import { CSSProperties, MouseEvent } from "react";
import { observer } from "mobx-react";
import { memoUIActions, setDropdownMenuByNameOrNull } from "src/actions";
import { Button, ControlledInput } from "src/shared";
import { memoStore } from "src/stores";
import searchIcon from "src/assets/svg/search_24dp.svg";
import clearTextIcon from "src/assets/svg/close_black_24dp.svg";
import moreIcon from "src/assets/svg/more_vert_24dp.svg";
import { setSessionPersistedUIState } from "src/utils";

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

  const searchMemoTitleChangeHandler = (typedValue: string) => {
    memoUIActions.setFilterProfileByKeyAndValue("title", typedValue);
    setSessionPersistedUIState({
      MEMO_UI_STORE: [
        { key: "FILTER", value: memoStore.uiStoreInstance.filterProfile },
      ],
    });
  };

  const clearMemoTitleSearchHandler = () => {
    memoUIActions.setFilterProfileByKeyAndValue("title");
    setSessionPersistedUIState({
      MEMO_UI_STORE: [
        { key: "FILTER", value: memoStore.uiStoreInstance.filterProfile },
      ],
    });
  };

  const onMoreActionsMenuClicked = (event?: MouseEvent<HTMLDivElement>) => {
    setDropdownMenuByNameOrNull("/taskin/memos-memosMenu");
  };

  return (
    <div className={classes.memosHeader}>
      <div className={classes.searchInputWrapper}>
        <Button
          styleOverride={buttonStylesOverride.headerButton}
          title=""
          icon={
            uiStoreInstance.filterProfile.title ? clearTextIcon : searchIcon
          }
          onClick={clearMemoTitleSearchHandler}
        />
        <ControlledInput
          placeholder="find memo..."
          value={uiStoreInstance.filterProfile.title || ""}
          onChange={searchMemoTitleChangeHandler}
        />
        <Button
          styleOverride={buttonStylesOverride.headerMenuButton}
          icon={moreIcon}
          title=""
          tooltipText="Memos Actions"
          onClick={onMoreActionsMenuClicked}
        />
      </div>
    </div>
  );
});
