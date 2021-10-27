import { Button } from "../../../../../../shared";
import { userStore } from "../../../../../../stores";
import { routerLocationSetter } from "../../../../../../actions";
import { TaskinTitle } from "../../../../../../shared/taskin-title/taskin-title";

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
      <TaskinTitle />
      <Button
        styleOverride={{ width: "70px" }}
        onClick={logOutButtonHandler}
        title="log-out"
      />
    </div>
  );
};
