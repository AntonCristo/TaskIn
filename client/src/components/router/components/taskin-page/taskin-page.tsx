import { userStore, memoStore } from "../../../../stores";
import { routerLocationSetter } from "../../../../actions";
import { MainMenu, Header, InnerRouter } from "./components";

import classes from "./taskin-page.module.css";

export const TaskinPage = () => {
  const { getUserFromLocalStorage } = userStore;

  const _user = getUserFromLocalStorage();

  if (!_user) {
    alert("[taskin page]: USER ERROR, redirected to home page");
    routerLocationSetter("/");
    return null;
  }

  memoStore.dataStoreInstance.initMemosDataStore();

  return (
    <div className={classes.taskinPage}>
      <MainMenu />
      <div className={classes.contentWrapper}>
        <Header />
        <InnerRouter />
      </div>
    </div>
  );
};
