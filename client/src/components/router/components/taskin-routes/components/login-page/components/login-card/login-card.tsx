import { CSSProperties, MouseEvent } from "react";

import { Button } from "../../../../../../../../shared";
import { routerLocationSetter } from "../../../../../../../../actions";
import closeIcon from "../../../../../../../../assets/svg/close_black_24dp.svg";

import classes from "./login-card.module.css";

const closeIconButtonStyleOverride: CSSProperties = {
  border: "none",
  padding: "0",
  minWidth: "25px",
  marginRight: "-5px",
};

export const LoginCard = () => {
  const preventParentClickEventHandler = (
    event: MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
  };

  const onCloseIconClickedHandler = () => {
    routerLocationSetter("/home");
  };

  return (
    <div onClick={preventParentClickEventHandler} className={classes.loginCard}>
      <div className={classes.loginCardHeader}>
        Log in options
        <Button
          title=""
          icon={closeIcon}
          onClick={onCloseIconClickedHandler}
          styleOverride={closeIconButtonStyleOverride}
        />
      </div>
      <div className={classes.loginCardContent}>
        Log in with your Google account
        <div style={{ border: "1px solid #c3676c", marginTop: "12px" }}>
          google button (needs implement)
        </div>
      </div>
    </div>
  );
};
