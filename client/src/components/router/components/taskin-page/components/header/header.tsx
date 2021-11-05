import { observer } from "mobx-react";
import { MemoColorMap } from "src/shared";

import { UserInfo } from "./components";

import classes from "./header.module.css";

export const Header = observer(() => {
  return (
    <div className={classes.header}>
      <UserInfo />
      <div className={classes.memoColorsMapWrapper}>
        <MemoColorMap />
      </div>
    </div>
  );
});
