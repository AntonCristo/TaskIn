import { makeAutoObservable } from "mobx";

//api => [/routeName-menuName]
export type TaskinDropDownMenuName =
  | "/taskin-userMenu"
  | "/taskin/memos-memosMenu"
  | null;

class DropdownMenuStore {
  constructor() {
    makeAutoObservable(this);
  }

  private _activeDropdownMenu: TaskinDropDownMenuName = null;
  get activeDropdownMenu() {
    return this._activeDropdownMenu;
  }
  set activeDropdownMenu(activeMenu: TaskinDropDownMenuName) {
    this._activeDropdownMenu = activeMenu;
  }

  private _activeMenuLocation = {
    top: 0,
    left: 0,
  };
  get activeMenuLocation() {
    return this._activeMenuLocation;
  }
  set activeMenuLocation(menuLocationUpdate) {
    this._activeMenuLocation = menuLocationUpdate;
  }
}

export const dropdownMenuStore = new DropdownMenuStore();
