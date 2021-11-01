import { observer } from "mobx-react";

import { locationStore, TaskinRoutes } from "../../../../../../../../stores";

import classes from "./navigation-menu.module.css";

export const NavigationMenu = observer(() => {
  const { taskinActiveRoute } = locationStore;
  const navigationItems: TaskinRoutes[] = ["MEMOS", "TEAM_NOTES"];

  const translateTaskinSystemRoutesToUserDisplay = (
    taskinSystemRoute: TaskinRoutes
  ) => {
    switch (taskinSystemRoute) {
      case "MEMOS":
        return "Memos";
      case "TEAM_NOTES":
        return "Team Notes";
      default:
        throw Error(
          "[NavigationMenu]:: default case should never happen, check !!!"
        );
    }
  };

  return (
    <div className={classes.navigationMenu}>
      {navigationItems.map((navigationItem, index) => {
        const isActive = taskinActiveRoute === navigationItem;
        return (
          <li
            data-route={navigationItem}
            className={[
              classes.listItem,
              isActive && classes.activeListItem,
            ].join(" ")}
            key={index}
          >
            {translateTaskinSystemRoutesToUserDisplay(
              navigationItem as TaskinRoutes
            )}
          </li>
        );
      })}
    </div>
  );
});
