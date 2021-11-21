import { useState, MouseEvent } from "react";
import { observer } from "mobx-react";
import { dropdownMenuStore, userStore } from "src/stores";
import { setDropdownMenuByNameOrNull } from "src/actions";
import user from "src/assets/svg/account_circle_24dp.svg";
import arrowDown from "src/assets/svg/arrow_drop_down_24dp.svg";

import classes from "./user-info.module.css";

export const UserInfo = observer(() => {
  const { getUserFromLocalStorage } = userStore;
  const { activeDropdownMenu } = dropdownMenuStore;
  const [currentImgIconValue, setCurrentImgIconValue] = useState(user);

  const _user = getUserFromLocalStorage();

  if (!_user) {
    return null;
  }

  const onMouseOverHandler = () => {
    setCurrentImgIconValue(arrowDown);
  };

  const onMouseOutHandler = () => {
    setCurrentImgIconValue(user);
  };

  const onUserInfoClickedHandler = (event: MouseEvent<HTMLDivElement>) => {
    setDropdownMenuByNameOrNull(
      "/taskin-userMenu",
      event.clientY,
      event.clientX
    );
  };

  return (
    <div
      onClick={onUserInfoClickedHandler}
      onMouseOver={onMouseOverHandler}
      onMouseOut={onMouseOutHandler}
      className={classes.userInfo}
    >
      <img
        className={
          activeDropdownMenu === "/taskin-userMenu" ? classes.rotate180 : {}
        }
        src={
          activeDropdownMenu === "/taskin-userMenu"
            ? arrowDown
            : currentImgIconValue
        }
        alt=""
      />
      <span className={classes.userFullName}>{_user.fullName}</span>
    </div>
  );
});
