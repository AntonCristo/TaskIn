import dayjs from "dayjs";
import { action, makeAutoObservable } from "mobx";
import { Memo, Uuid } from "src/client-types";
import { memosService } from "src/services";
import { userStore } from "src/stores";
import { memosCrudActions } from "src/actions";
import { v4 as uuid } from "uuid";
import { getSessionPersistedUIState, userUtils } from "src/utils";

export type MemosDataMap = { [x: string]: Memo };

export type MemosDisplayClass = "ALL" | "IN_PROGRESS" | "COMPLETED" | "TRASH";

export const MEMO_TEMPLATE: Memo = {
  content: "",
  createdBy: "",
  creationDate: dayjs().valueOf(),
  dueDate: dayjs().add(1, "days").valueOf(),
  isDone: false,
  title: "New Memo",
  uuid: "",
  version: "0.1",
  isDeleted: false,
  hashtag: [],
};

export class MemosDataStore {
  constructor() {
    makeAutoObservable(this);
  }

  private _memosMap: MemosDataMap | null = null;
  public getMemosAsArray = () => {
    if (!this._memosMap) {
      return null;
    }

    const memosMapAsArray: Memo[] = [];
    for (let uuid in this._memosMap) {
      memosMapAsArray.push(Object.assign({}, this._memosMap[uuid]));
    }

    return memosMapAsArray;
  };
  get memosMap() {
    if (!this._memosMap) return {};
    else return this._memosMap;
  }
  set memosMap(mapUpdate: MemosDataMap) {
    this._memosMap = mapUpdate;

    localStorage.setItem(
      `${userUtils.getUserFromLocalStorage()?.uuid}_memos`,
      JSON.stringify(this._memosMap)
    );
    localStorage.setItem(
      `${userUtils.getUserFromLocalStorage()?.uuid}_backup_memos`,
      JSON.stringify(this._memosMap)
    );
  }

  private _initDisplayClassFromSession = () => {
    const sessionDisplayClassElement =
      getSessionPersistedUIState()?.MEMO_UI_STORE?.find(
        (uiElement) => uiElement.key === "DISPLAY_CLASS"
      );

    const displayClassValue =
      sessionDisplayClassElement?.value as MemosDisplayClass;

    return displayClassValue ? displayClassValue : null;
  };
  private _memosDisplayClass: MemosDisplayClass =
    this._initDisplayClassFromSession() || "IN_PROGRESS";
  get memosDisplayClass() {
    return this._memosDisplayClass;
  }
  set memosDisplayClass(displayClass: MemosDisplayClass) {
    this._memosDisplayClass = displayClass;
  }

  public initMemosDataStore = (userUUID: Uuid) => {
    !this._memosMap && console.log("[initMemosDataStore]:: start");
    !this._memosMap &&
      memosService
        .getMemosFromApiByInitiatorUUID(userUUID)
        .then((memosDataMapOrNull) => {
          if (!memosDataMapOrNull) {
            memosCrudActions.updateMemosDataMap({});
            return;
          }

          memosCrudActions.updateMemosDataMap(memosDataMapOrNull);
          return;
        })
        .catch((err) => {
          console.log(err);
          throw Error("[initMemosDataStore]:: somthing went wrong,check log");
        });
  };

  public getMemoTemplate = () => {
    const _user = userStore.getUserFromLocalStorage();

    if (!_user) {
      throw Error(
        "[getMemoTemplate]:: userData is not present in local storage"
      );
    }

    const memoTemplate: Memo = JSON.parse(JSON.stringify(MEMO_TEMPLATE));
    memoTemplate.uuid = uuid();
    memoTemplate.createdBy = _user.uuid;

    return memoTemplate;
  };

  public getMemosMapAsArrayByDisplayClass = (
    customPreference?: MemosDisplayClass
  ) => {
    if (!this.getMemosAsArray()) {
      return null;
    }

    const _innerDisplayClass = customPreference || this._memosDisplayClass;

    const memosMapAsArray: Memo[] = this.getMemosAsArray() || [];

    switch (_innerDisplayClass) {
      case "ALL":
        return memosMapAsArray.filter((memo) => !memo.isDeleted);
      case "COMPLETED":
        return memosMapAsArray.filter((memo) => !memo.isDeleted && memo.isDone);
      case "IN_PROGRESS":
        return memosMapAsArray.filter(
          (memo) => !memo.isDone && !memo.isDeleted
        );
      case "TRASH":
        return memosMapAsArray.filter((memo) => memo.isDeleted);
      default:
        throw Error(
          "[getMemosAsArray]:: default case should never happen, check everything!!!"
        );
    }
  };

  public nullifyDataOnLogout = action(() => {
    this._memosMap = null;
    this._memosDisplayClass = "IN_PROGRESS";
  });
}
