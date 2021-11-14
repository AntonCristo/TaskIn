import { observer } from "mobx-react";

import { UserInfo, MemoColorMap } from "./components";

import classes from "./header.module.css";

export const Header = observer(() => {
  return (
    <div className={classes.header}>
      <UserInfo />
      <div className={classes.memoColorsMapWrapper}>
        {/* //TODO: add switch to render header by url, and show quick filter only on dashboard */}
        <MemoColorMap />
      </div>
    </div>
  );
});
