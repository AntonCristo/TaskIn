import { CSSProperties } from "react";

import { Button } from "../../../../../../../../../../shared";
import newMemoIcon from "../../../../../../../../../../assets/svg/add_circle_24dp.svg";
import filterIcon from "../../../../../../../../../../assets/svg/filter_list_24dp.svg";
import sortIcon from "../../../../../../../../../../assets/svg/sort_24dp.svg";

import classes from "./memos-header.module.css";

export const MemosHeader = () => {
  const headerButtonStyleOverride: CSSProperties = {
    border: "none",
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
      <div className={classes.searchInputWrapper}>[search memo input]</div>
    </div>
  );
};
