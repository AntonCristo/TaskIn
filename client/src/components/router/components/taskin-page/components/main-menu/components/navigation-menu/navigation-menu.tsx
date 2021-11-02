import { MouseEvent } from "react";
import { observer } from "mobx-react";

import { locationStore, TaskinRoutes } from "../../../../../../../../stores";
import { routerLocationSetter } from "../../../../../../../../actions";
import teamNotesIcon from "../../../../../../../../assets/svg/team_24dp.svg";
import myMemosIcon from "../../../../../../../../assets/svg/memo_24dp.svg";

import classes from "./navigation-menu.module.css";

type NavigationItem = {
  route: TaskinRoutes;
  icon: string;
};

export const NavigationMenu = observer(() => {
  const {
    translateTaskinSystemRoutesToUserDisplay,
    translateTaskinSystemRoutesToUrlValue,
    reduceActiveRouteFromUrl,
  } = locationStore;

  const navigationItems: NavigationItem[] = [
    { route: "MEMOS", icon: myMemosIcon },
    { route: "TEAM_NOTES", icon: teamNotesIcon },
  ];

  const activeMenuItem = reduceActiveRouteFromUrl();

  const onNavigationItemClickHandler = (event: MouseEvent<HTMLLIElement>) => {
    const clickedRouteSystemValue = event.currentTarget.getAttribute(
      "data-route"
    ) as TaskinRoutes;

    const urlFormatOfClickedSystemValue = translateTaskinSystemRoutesToUrlValue(
      clickedRouteSystemValue
    );

    routerLocationSetter(`/taskin/${urlFormatOfClickedSystemValue}`);
  };

  return (
    <div className={classes.navigationMenu}>
      {navigationItems.map((navigationItem, index) => {
        const isActive = activeMenuItem === navigationItem.route;
        return (
          <li
            key={index}
            onClick={onNavigationItemClickHandler}
            data-route={navigationItem.route}
            className={[
              classes.listItem,
              isActive && classes.activeListItem,
            ].join(" ")}
          >
            {translateTaskinSystemRoutesToUserDisplay(
              navigationItem.route as TaskinRoutes
            )}
            <img src={navigationItem.icon} alt="nav-item-icon" />
          </li>
        );
      })}
    </div>
  );
});
