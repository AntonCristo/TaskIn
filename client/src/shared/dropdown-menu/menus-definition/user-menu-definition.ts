import { MenuListItem } from "../dropdown-menu";
import { userStore } from "../../../stores";
import { routerLocationSetter } from "../../../actions";

const userMenuLogoutHandler = () => {
  userStore.clearUserFromLocalStorage();
  routerLocationSetter("/home");
};

export const userMenuListItems: MenuListItem[] = [
  {
    disabled: true,
    onClick: () => alert("user info"),
    text: "Account info",
    icon: "",
  },
  {
    disabled: false,
    onClick: userMenuLogoutHandler,
    text: "Log-out",
    icon: "",
  },
];
