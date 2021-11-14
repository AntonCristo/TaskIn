import { mobileToggleMainMenuVisibility } from "src/actions";

import classes from "./mobile-menu-button.module.css";

export const MobileMenuButton = () => {
  return (
    <div
      onClick={mobileToggleMainMenuVisibility}
      className={classes.menuButton}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
