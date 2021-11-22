import { observer } from "mobx-react";
import { setDropdownMenuByNameOrNull } from "src/actions";
import { dropdownMenuStore, memoStore } from "src/stores";
import {
  userMenuListItems,
  memosMenuListItems,
  popClearTrashConfirmation,
  addNewMemoToMapWithoutValidation,
} from "src/shared/dropdown-menu/menus-definition";
import clearTrashIcon from "src/assets/svg/delete_forever_24dp.svg";
import newMemoIcon from "src/assets/svg/add_circle_24dp.svg";
import deleteIcon from "src/assets/svg/delete_24dp.svg";
import { customError } from "src/errors";

import { MenuWrapper, UserMenuHeader } from "./components";
import { popMoveAllCompletedToTrashConfirmation } from "./menus-definition/memos-menu-definition";

import classes from "./dropdown-menu.module.css";

export type MenuListItem = {
  icon?: string;
  text: string;
  onClick: () => void;
  disabled: boolean;
};

export const DropdownMenu = observer(() => {
  const { activeDropdownMenu } = dropdownMenuStore;
  const { dataStoreInstance } = memoStore;

  const onOutsideClickedHandler = () => {
    setDropdownMenuByNameOrNull(null);
  };

  const memoMenusDynamicOptions = () => {
    const dynamicActionsExtenstion: MenuListItem[] = [];

    switch (dataStoreInstance.memosDisplayClass) {
      case "ALL":
      case "IN_PROGRESS":
        dynamicActionsExtenstion.push({
          disabled: false,
          onClick: addNewMemoToMapWithoutValidation,
          text: "Add Memo",
          icon: newMemoIcon,
        });
        break;
      case "COMPLETED":
        dynamicActionsExtenstion.push({
          disabled: false,
          text: "Delete All",
          onClick: popMoveAllCompletedToTrashConfirmation,
          icon: deleteIcon,
        });
        break;
      case "TRASH":
        dynamicActionsExtenstion.push({
          disabled: false,
          text: "Clear Trash",
          onClick: popClearTrashConfirmation,
          icon: clearTrashIcon,
        });
        break;
      default:
        throw customError.unexpectedSwitchDefaultCaseError(
          "memoMenusDynamicOptions"
        );
    }

    return dynamicActionsExtenstion;
  };

  const renderMenuByName = () => {
    switch (activeDropdownMenu) {
      case "/taskin-userMenu":
        return (
          <MenuWrapper
            position={{
              top: `${70}px`,
              right: `${15}px`,
            }}
            listItems={userMenuListItems}
          >
            <UserMenuHeader />
          </MenuWrapper>
        );
      case "/taskin/memos-memosMenu":
        return (
          <MenuWrapper
            listItems={[...memosMenuListItems, ...memoMenusDynamicOptions()]}
            position={{ top: "110px", right: "15px" }}
          />
        );
      default:
        throw customError.unexpectedSwitchDefaultCaseError("DropdownMenu");
    }
  };

  return activeDropdownMenu ? (
    <div onClick={onOutsideClickedHandler} className={classes.menu}>
      {renderMenuByName()}
    </div>
  ) : null;
});
