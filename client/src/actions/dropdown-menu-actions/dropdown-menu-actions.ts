import { action } from "mobx";
import { TaskinDropDownMenuName, dropdownMenuStore } from "src/stores";

export const setDropdownMenuByNameOrNull = action(
  (dropdownMenuName: TaskinDropDownMenuName, top: number, left: number) => {
    dropdownMenuStore.activeDropdownMenu = dropdownMenuName;
    dropdownMenuStore.activeMenuLocation = {
      top: top,
      left: left,
    };
  }
);
