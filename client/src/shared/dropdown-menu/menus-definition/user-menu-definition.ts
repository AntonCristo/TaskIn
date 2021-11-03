import { MenuListItem } from "src/shared";
import { userStore } from "src/stores";
import { routerLocationSetter } from "src/actions";
import logoutIcon from "src/assets/svg/logout_24dp.svg";
import accountIcon from "src/assets/svg/account_circle_24dp.svg";

const userMenuLogoutHandler = () => {
  userStore.clearUserFromLocalStorage();
  routerLocationSetter("/");
};

export const userMenuListItems: MenuListItem[] = [
  {
    disabled: true,
    onClick: () => alert("user info"),
    text: "Account Info",
    icon: accountIcon,
  },
  {
    disabled: false,
    onClick: userMenuLogoutHandler,
    text: "Log Out",
    icon: logoutIcon,
  },
];
