import { action } from "mobx";
import { TaskinDropDownMenuName, dropdownMenuStore } from "../../stores";

export const setDropdownMenuByNameOrNull = action(
  (dropdownMenuName: TaskinDropDownMenuName) => {
    dropdownMenuStore.activeDropdownMenu = dropdownMenuName;
  }
);
