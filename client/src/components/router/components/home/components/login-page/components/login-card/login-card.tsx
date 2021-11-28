import { MouseEvent } from "react";
import { Box } from "src/shared";

import { GoogleButton } from "./components";

import classes from "./login-card.module.css";

export const LoginCard = () => {
  const preventParentClickEventHandler = (
    event: MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
  };

  return (
    <div onClick={preventParentClickEventHandler}>
      <Box>
        <div className={classes.cardHeader}>
          <div>Log In</div>
        </div>
        <div className={classes.loginCardContent}>
          <GoogleButton />
        </div>
      </Box>
    </div>
  );
};
