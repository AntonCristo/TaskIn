import { routerLocationSetter } from "src/actions";
import { Button } from "src/shared";
import refreshIcon from "src/assets/svg/refresh_24dp.svg";

import classes from "./sort-memos.module.css";

export const SortMemos = () => {
  const onResetSortHandler = () => {
    alert("clear sorting profile");
    routerLocationSetter("/taskin/memos");
  };

  return (
    <div className={classes.sortMemosWrapper}>
      <Button icon={refreshIcon} title="Reset" onClick={onResetSortHandler} />
    </div>
  );
};
