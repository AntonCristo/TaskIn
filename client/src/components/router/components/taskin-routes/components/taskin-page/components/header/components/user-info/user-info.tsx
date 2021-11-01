import { useState } from "react";
import { observer } from "mobx-react";

import {
  dropdownMenuStore,
  userStore,
} from "../../../../../../../../../../stores";
import {
  routerLocationSetter,
  setDropdownMenuByNameOrNull,
} from "../../../../../../../../../../actions";
import user from "../../../../../../../../../../assets/svg/account_circle_24dp.svg";
import arrowDown from "../../../../../../../../../../assets/svg/arrow_drop_down_24dp.svg";

import classes from "./user-info.module.css";

export const UserInfo = observer(() => {
  //TODO: define UserInfo style for mobile
  const { getUserFromLocalStorage } = userStore;
  const { activeDropdownMenu } = dropdownMenuStore;
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

  const onUserInfoClickedHandler = () => {
    setDropdownMenuByNameOrNull("/taskin-userMenu");
  };

  return (
    <div
      onClick={onUserInfoClickedHandler}
      onMouseOver={onMouseOverHandler}
      onMouseOut={onMouseOutHandler}
      className={classes.userInfo}
    >
      <img
        className={activeDropdownMenu ? classes.rotate180 : {}}
        src={activeDropdownMenu ? arrowDown : currentImgIconValue}
        alt=""
      />
      <span className={classes.userFullName}>{_user.fullName}</span>
    </div>
  );
});
