import { makeAutoObservable } from "mobx";
import { Memo } from "src/client-types";
import { memosService } from "src/services";

export type MemosDataMap = { [x: string]: Memo };

export class MemosDataStore {
  constructor() {
    makeAutoObservable(this);
  }

  private _memosMap: MemosDataMap | null = null;
  public getMemos = () => {
    if (!this._memosMap) {
      return null;
    }

    const memosMapAsArray: Memo[] = [];
    for (let uuid in this._memosMap) {
      memosMapAsArray.push(this._memosMap[uuid]);
    }
    return memosMapAsArray;
  };
  set memosMap(mapUpdate: MemosDataMap) {
    this._memosMap = mapUpdate;
  }

  public initMemosDataStore = () => {
    try {
      !this._memosMap && console.log("[initMemosDataStore]:: start");
      !this._memosMap && memosService.getMemosFromApiByInitiatorUUID();
    } catch (error) {
      !this._memosMap && console.log("[initMemosDataStore]:: Error");
    }
  };
}
