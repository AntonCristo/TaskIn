import { observer } from "mobx-react";
import { locationStore } from "src/stores";

import { UserInfo, MemoColorMap, MobileMenuButton } from "./components";

import classes from "./header.module.css";

export const Header = observer(() => {
  const { router_view } = locationStore;

  const renderByLocation = () => {
    if (router_view === "/taskin/memos") {
      return (
        <div className={classes.memoColorsMapWrapper}>
          <MemoColorMap />
        </div>
      );
    }

    return null;
  };

  return (
    <div className={classes.header}>
      <UserInfo />
      {renderByLocation()}
      <MobileMenuButton />
    </div>
  );
});
