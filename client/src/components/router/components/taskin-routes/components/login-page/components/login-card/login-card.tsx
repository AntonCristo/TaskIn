import { MouseEvent } from "react";

import classes from "./login-card.module.css";

export const LoginCard = () => {
  const preventParentClickEventHandler = (
    event: MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
  };

  return (
    <div onClick={preventParentClickEventHandler} className={classes.loginCard}>
      <div className={classes.loginCardHeader}>Log in options</div>
      <div className={classes.loginCardContent}>
        Log in with your Google account
        <div style={{ border: "1px solid #c3676c", marginTop: "12px" }}>
          google button (needs implement)
        </div>
      </div>
    </div>
  );
};
