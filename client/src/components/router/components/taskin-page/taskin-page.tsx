import { userStore, memoStore } from "src/stores";
import { routerLocationSetter, memoUIActions } from "src/actions";

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

  const fetchedMemos = memoStore.dataStoreInstance.initMemosDataStore();
  if (fetchedMemos) {
    [...Object.keys(fetchedMemos)].forEach((memoUUID) => {
      memoUIActions.initSingleMemoCollapseState(memoUUID);
    });
  }

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
