import { observer } from "mobx-react";
import { MouseEvent } from "react";
import { tooltipConstants } from "src/constants";
import { tooltipActions } from "src/actions";
import { locationStore, tooltipStore } from "src/stores";
import infoIcon from "src/assets/svg/info_24dp.svg";

import { UserInfo, MemoColorMap, MobileMenuButton } from "./components";

import classes from "./header.module.css";

export const Header = observer(() => {
  const { router_view } = locationStore;
  const { title } = tooltipStore;

  const onMouseOverHandler = (event: MouseEvent<HTMLDivElement>) => {
    !title &&
      tooltipActions.showTooltip(
        tooltipConstants.quickHeaderFilter,
        event.clientY,
        event.clientX,
        1000
      );
  };

  const onMouseOutHandler = () => {
    tooltipActions.resetTooltip();
  };

  const renderByLocation = () => {
    if (router_view === "/taskin/memos") {
      return (
        <div className={classes.memoColorsMapWrapper}>
          <MemoColorMap />
          <div
            className={classes.infoIConDiv}
            onMouseEnter={onMouseOverHandler}
            onMouseLeave={onMouseOutHandler}
          >
            <img src={infoIcon} alt="info" />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={classes.header}>
      <UserInfo />
      <MobileMenuButton />
      {renderByLocation()}
    </div>
  );
});
