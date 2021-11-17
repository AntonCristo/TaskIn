import { userStore, memoStore } from "src/stores";
import { routerLocationSetter, memoUIActions } from "src/actions";

import { MainMenu, Header, InnerRouter } from "./components";

import classes from "./taskin-page.module.css";
import { observer } from "mobx-react";

export const TaskinPage = observer(() => {
  const { getUserFromLocalStorage } = userStore;

  const _user = getUserFromLocalStorage();

  if (!_user) {
    alert("[taskin page]: USER ERROR, redirected to home page");
    routerLocationSetter("/");
    return null;
  }

  memoStore.dataStoreInstance.initMemosDataStore(_user.uuid);
  if (memoStore.dataStoreInstance.memosMap) {
    [...Object.keys(memoStore.dataStoreInstance.memosMap)].forEach(
      (memoUUID) => {
        if (
          !memoStore.uiStoreInstance.memoUrgencyLevelMap[memoUUID] &&
          !memoStore.dataStoreInstance.memosMap[memoUUID].isDeleted &&
          !memoStore.dataStoreInstance.memosMap[memoUUID].isDone
        ) {
          memoUIActions.calculateSingleMemoUrgencyLevelColor(memoUUID);
        }
        if (!memoStore.uiStoreInstance.memosCollapseStateMap[memoUUID]) {
          memoUIActions.initSingleMemoCollapseState(memoUUID);
        }
      }
    );
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
});
