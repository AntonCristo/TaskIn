import { observer } from "mobx-react";

import { TaskinTitle } from "../../../../../../shared/taskin-title/taskin-title";
import { mobileToggleMainMenuVisibility } from "../../../../../../actions";
import { mainMenuStore } from "../../../../../../stores";
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
