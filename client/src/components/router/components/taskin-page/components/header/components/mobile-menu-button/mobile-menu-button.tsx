import { observer } from "mobx-react";
import { showMainMenu, hideMainMenu } from "src/actions";
import { mainMenuStore } from "src/stores";

import classes from "./mobile-menu-button.module.css";

export const MobileMenuButton = observer(() => {
  const { isOpen } = mainMenuStore;

  return isOpen ? null : (
    <div
      onClick={isOpen ? hideMainMenu : showMainMenu}
      className={classes.menuButton}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
});
