import { CSSProperties } from "react";
import { observer } from "mobx-react";

import { memoUIActions } from "../../../../../../../../../../actions";
import { Button, ControlledInput } from "../../../../../../../../../../shared";
import { memoStore } from "../../../../../../../../../../stores";
import newMemoIcon from "../../../../../../../../../../assets/svg/add_circle_24dp.svg";
import filterIcon from "../../../../../../../../../../assets/svg/filter_list_24dp.svg";
import sortIcon from "../../../../../../../../../../assets/svg/sort_24dp.svg";
import searchIcon from "../../../../../../../../../../assets/svg/search_24dp.svg";
import clearTextIcon from "../../../../../../../../../../assets/svg/close_black_24dp.svg";

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

  return (
    <div className={classes.memosHeader}>
      <div className={classes.headerButtons}>
        <Button
          styleOverride={headerButtonStyleOverride}
          title="New Memo"
          icon={newMemoIcon}
          onClick={() => {}}
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
              : () => {}
          }
        />
        <ControlledInput
          placeholder="memos title..."
          value={uiStoreInstance.memoSearchText}
          onChange={searchMemoTextChangeHandler}
        />
      </div>
    </div>
  );
});
