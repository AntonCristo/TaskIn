import { observer } from "mobx-react";
import { TaskinTitle } from "src/shared";
import { mobileToggleMainMenuVisibility } from "src/actions";
import { mainMenuStore } from "src/stores";

import { MobileBackdrop, NavigationMenu } from "./components";

import classes from "./main-menu.module.css";

export const MainMenu = observer(() => {
  const { isOpen } = mainMenuStore;
  return isOpen ? (
    <>
      <MobileBackdrop onClick={mobileToggleMainMenuVisibility} />
      <div className={classes.mainMenu}>
        <TaskinTitle />
        <NavigationMenu />
      </div>
    </>
  ) : null;
});
