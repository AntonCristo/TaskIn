import { MenuListItem } from "src/shared";
import { memoStore, userStore } from "src/stores";
import { routerLocationSetter } from "src/actions";
import logoutIcon from "src/assets/svg/logout_24dp.svg";
import accountIcon from "src/assets/svg/account_circle_24dp.svg";
import { resetPerssistedSessionStateOnLogout } from "src/utils";

const userMenuLogoutHandler = () => {
  userStore.clearUserFromLocalStorage();
  memoStore.dataStoreInstance.nullifyDataOnLogout();
  memoStore.uiStoreInstance.nullifyUIStateOnLogout();
  resetPerssistedSessionStateOnLogout();
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
