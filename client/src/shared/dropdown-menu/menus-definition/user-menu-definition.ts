import { MenuListItem } from "../dropdown-menu";
import { userStore } from "../../../stores";
import { routerLocationSetter } from "../../../actions";
import logoutIcon from "../../../assets/svg/logout_24dp.svg";
import accountIcon from "../../../assets/svg/account_circle_24dp.svg";

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
