import { observer } from "mobx-react";

import { MobileBackdrop } from "./components";
import { TaskinTitle } from "../../../../../../../../shared/taskin-title/taskin-title";
import { mobileToggleMainMenuVisibility } from "../../../../../../../../actions";
import { mainMenuStore } from "../../../../../../../../stores";

import classes from "./main-menu.module.css";

export const MainMenu = observer(() => {
  const { isOpen } = mainMenuStore;
  return (
    <>
      <MobileBackdrop onClick={mobileToggleMainMenuVisibility} />
      {isOpen ? (
        <div className={classes.mainMenu}>
          <TaskinTitle />
        </div>
      ) : null}
    </>
  );
});
