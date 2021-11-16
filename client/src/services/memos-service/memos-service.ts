import { updateMemosDataMap } from "src/actions/memos-actions/memo-crud";
import { Memo, Uuid } from "src/client-types";
import { IMemoService } from "src/contracts";
import { MemosDataMap } from "src/stores";

const memosFromLocalStorage = localStorage.getItem("memos") || "{}";
const parsedMemosFromStorage: { [x: string]: Memo } = JSON.parse(
  memosFromLocalStorage
);
const memoMocks: Memo[] = [];

class MemosService implements IMemoService {
  public getMemosFromApiByInitiatorUUID = async (userUUID: Uuid) => {
    let memosRes: MemosDataMap | null = null;
    //here should be the api GET call
    //on the then case of the promise => memosRes = {}
    //on the catch return the memosRes as null
    Object.keys(parsedMemosFromStorage).forEach((key) => {
      parsedMemosFromStorage[key].createdBy === userUUID &&
        memoMocks.push(parsedMemosFromStorage[key]);
    });
    //simulation of "then" case of returned promise:
    setTimeout(() => {
      memosRes = {};
      memoMocks.forEach((memo) => {
        memosRes![memo.uuid] = memo;
      });
      updateMemosDataMap(memosRes);
      return memosRes;
    }, 2000);

    return memosRes;
  };
}

export const memosService = new MemosService();
