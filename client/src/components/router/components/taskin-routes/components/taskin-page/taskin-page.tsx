import { userStore } from "../../../../../../stores";
import { routerLocationSetter } from "../../../../../../actions";
import { MainMenu, Header } from "./components";

import classes from "./taskin-page.module.css";

export const TaskinPage = () => {
  const { getUserFromLocalStorage } = userStore;

  const _user = getUserFromLocalStorage();

  if (!_user) {
    alert("[taskin page]: USER ERROR, redirected to home page");
    routerLocationSetter("/");
    return null;
  }

  return (
    <div className={classes.taskinPage}>
      <MainMenu />
      <div className={classes.contentWrapper}>
        <Header />
        {/* inner router component location */}
      </div>
    </div>
  );
};
