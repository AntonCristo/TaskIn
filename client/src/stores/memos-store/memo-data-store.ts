import dayjs from "dayjs";
import { makeAutoObservable } from "mobx";
import { Memo } from "src/client-types";
import { memosService } from "src/services";
import { userStore } from "src/stores";
import { v4 as uuid } from "uuid";

export type MemosDataMap = { [x: string]: Memo };

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
      memosMapAsArray.push(this._memosMap[uuid]);
    }
    return memosMapAsArray;
  };
  get memosMap() {
    if (!this._memosMap) return {};
    else return this._memosMap;
  }
  set memosMap(mapUpdate: MemosDataMap) {
    this._memosMap = mapUpdate;

    localStorage.setItem("memos", JSON.stringify(this._memosMap));
    //TODO: add upsert method to api instead of local storage
  }

  public initMemosDataStore = () => {
    try {
      !this._memosMap && console.log("[initMemosDataStore]:: start");
      !this._memosMap && memosService.getMemosFromApiByInitiatorUUID();
    } catch (error) {
      !this._memosMap && console.log("[initMemosDataStore]:: Error");
    }
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
}
