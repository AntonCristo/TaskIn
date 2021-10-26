import { userStore } from "../../../../../../stores";
import { routerLocationSetter } from "../../../../../../actions";

import classes from "./taskin-page.module.css";

export const TaskinPage = () => {
  const { getMockUserFromLocalStorage, clearUserFromLocalStorage } = userStore;

  const _user = getMockUserFromLocalStorage();

  if (!_user) {
    alert("USER ERROR, redirected to home page");
    routerLocationSetter("/home");
    return null;
  }

  const logOutButtonHandler = () => {
    clearUserFromLocalStorage();
    routerLocationSetter("/home");
  };

  return (
    <div className={classes.taskinPage}>
      TASKINPAGE [{_user.fullName}]::[{_user.email}]
      <button onClick={logOutButtonHandler}>Logout</button>
    </div>
  );
};
