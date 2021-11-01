import { observer } from "mobx-react";

import { UserInfo } from "./components";

import classes from "./header.module.css";

export const Header = observer(() => {
  return (
    <div className={classes.header}>
      <UserInfo />
    </div>
  );
});
