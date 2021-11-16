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

  //TODO: Move to general initiation method/procedure
  memoStore.dataStoreInstance.initMemosDataStore(_user.uuid);
  //TODO: check logic, this renders the whole tree on every change in any memo
  if (memoStore.dataStoreInstance.memosMap) {
    console.log("[TaskinPage]: render");
    [...Object.keys(memoStore.dataStoreInstance.memosMap)].forEach(
      (memoUUID) => {
        if (!memoStore.uiStoreInstance.memoUrgencyLevelMap[memoUUID]) {
          memoUIActions.calculateSingleMemoUrgencyLevelState(memoUUID);
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
