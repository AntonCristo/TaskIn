import dayjs from "dayjs";
import { makeAutoObservable } from "mobx";
import { Memo } from "src/client-types";
import { memosService } from "src/services";
import { userStore } from "src/stores";
import { v4 as uuid } from "uuid";

export type MemosDataMap = { [x: string]: Memo };

export const MEMO_TEMPLATE: Memo = {
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae consectetur enim. Vivamus malesuada fringilla eros, finibus semper lacus fermentum ut. Proin maximus, sapien sit amet lacinia tincidunt, ante neque dignissim sapien, a commodo felis massa et diam. Cras id felis commodo, lacinia metus sed, suscipit leo. Nam sagittis sapien vitae elit facilisis mattis. Fusce accumsan volutpat venenatis. Aliquam erat volutpat. Ut laoreet aliquam ex id malesuada. Donec venenatis lorem quis tortor faucibus aliquam. Duis viverra, urna non maximus venenatis, magna nulla tincidunt sapien, in porttitor mauris libero malesuada lorem. Ut id ligula sit amet nunc pretium commodo vitae sit amet massa. Suspendisse consectetur nibh vitae lorem vehicula ornare.",
  createdBy: "",
  creationDate: dayjs().valueOf(),
  dueDate: dayjs().add(1, "days").valueOf(),
  isDone: false,
  title: "New Memo",
  uuid: "",
  version: "0.1",
  label: "",
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
    //TODO: add upsert method to api
  }

  public initMemosDataStore = () => {
    try {
      !this._memosMap && console.log("[initMemosDataStore]:: start");
      !this._memosMap && memosService.getMemosFromApiByInitiatorUUID();
      return this._memosMap;
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
