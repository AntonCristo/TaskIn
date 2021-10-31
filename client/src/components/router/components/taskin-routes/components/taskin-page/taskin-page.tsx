import { userStore } from "../../../../../../stores";
import { routerLocationSetter } from "../../../../../../actions";
import { MainMenu } from "./components";

import classes from "./taskin-page.module.css";

export const TaskinPage = () => {
  const { getUserFromLocalStorage } = userStore;

  const _user = getUserFromLocalStorage();

  if (!_user) {
    alert("USER ERROR, redirected to home page");
    routerLocationSetter("/home");
    return null;
  }

  return (
    <div className={classes.taskinPage}>
      <MainMenu />
    </div>
  );
};
