import { useState } from "react";

import { userStore } from "../../../../../../../../../../stores";
import { routerLocationSetter } from "../../../../../../../../../../actions";
import user from "../../../../../../../../../../assets/svg/account_circle_24dp.svg";
import arrowDown from "../../../../../../../../../../assets/svg/arrow_drop_down_24dp.svg";

import classes from "./user-info.module.css";

export const UserInfo = () => {
  //TODO: define UserInfo style for mobile
  const { getUserFromLocalStorage } = userStore;
  const [currentImgIconValue, setCurrentImgIconValue] = useState(user);

  const _user = getUserFromLocalStorage();

  if (!_user) {
    alert("USER ERROR, redirected to home page");
    routerLocationSetter("/home");
    return null;
  }

  const onMouseOverHandler = () => {
    setCurrentImgIconValue(arrowDown);
  };

  const onMouseOutHandler = () => {
    setCurrentImgIconValue(user);
  };

  return (
    <div
      onMouseOver={onMouseOverHandler}
      onMouseOut={onMouseOutHandler}
      className={classes.userInfo}
    >
      <img src={currentImgIconValue} alt="" />
      {_user.fullName}
    </div>
  );
};
