import { observer } from "mobx-react";
import { setDropdownMenuByNameOrNull } from "src/actions";
import { dropdownMenuStore } from "src/stores";
import {
  userMenuListItems,
  memosMenuListItems,
} from "src/shared/dropdown-menu/menus-definition";

import { MenuWrapper, UserMenuHeader } from "./components";

import classes from "./dropdown-menu.module.css";

export type MenuListItem = {
  icon?: string;
  text: string;
  onClick: () => void;
  disabled: boolean;
};

export const DropdownMenu = observer(() => {
  const { activeDropdownMenu } = dropdownMenuStore;

  const onOutsideClickedHandler = () => {
    setDropdownMenuByNameOrNull(null);
  };

  const renderMenuByName = () => {
    switch (activeDropdownMenu) {
      case "/taskin-userMenu":
        return (
          <MenuWrapper
            position={{ top: "60px", right: "15px" }}
            listItems={userMenuListItems}
          >
            <UserMenuHeader />
          </MenuWrapper>
        );
      case "/taskin/memos-memosMenu":
        return (
          <MenuWrapper
            listItems={memosMenuListItems}
            position={{ top: "110px", right: "15px" }}
          />
        );
      default:
        throw Error("[DropdownMenu]:: default case should never happen!");
    }
  };

  return activeDropdownMenu ? (
    <div onClick={onOutsideClickedHandler} className={classes.menu}>
      {renderMenuByName()}
    </div>
  ) : null;
});
