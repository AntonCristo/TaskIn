import { UserInfo, MemoColorMap, MobileMenuButton } from "./components";

import classes from "./header.module.css";

export const Header = () => {
  return (
    <div className={classes.header}>
      <UserInfo />
      <MobileMenuButton />
      <div className={classes.memoColorsMapWrapper}>
        <MemoColorMap />
      </div>{" "}
    </div>
  );
};
