import { action } from "mobx";
import { TaskinDropDownMenuName, dropdownMenuStore } from "src/stores";

export const setDropdownMenuByNameOrNull = action(
  (dropdownMenuName: TaskinDropDownMenuName) => {
    dropdownMenuStore.activeDropdownMenu = dropdownMenuName;
  }
);
