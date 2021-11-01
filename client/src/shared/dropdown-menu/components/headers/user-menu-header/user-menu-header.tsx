import { userStore } from "../../../../../stores";

import classes from "./user-menu-header.module.css";

export const UserMenuHeader = () => {
  const { getUserFromLocalStorage } = userStore;

  const _user = getUserFromLocalStorage();

  if (!_user) {
    return null;
  }

  return <div className={classes.userMenuHeader}>{_user.email}</div>;
};
