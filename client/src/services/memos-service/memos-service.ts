import { updateMemosDataMap } from "src/actions/memos-actions/memo-crud";
import { Memo } from "src/client-types";
import { IMemoService } from "src/contracts";
import { MemosDataMap } from "src/stores";

const memosFromLocalStorage = localStorage.getItem("memos") || "{}";
const parsedMemosFromStorage: { [x: string]: any } = JSON.parse(
  memosFromLocalStorage
);
const memoMocks: Memo[] = [];

Object.keys(parsedMemosFromStorage).forEach((key) => {
  memoMocks.push(parsedMemosFromStorage[key]);
});

class MemosService implements IMemoService {
  public getMemosFromApiByInitiatorUUID = async () => {
    let memosRes: MemosDataMap | null = null;
    //here should be the api GET call
    //on the then case of the promise => memosRes = {}
    //on the catch return the memosRes as null

    //simulation of "then" case of returned promise:
    setTimeout(() => {
      memosRes = {};
      memoMocks.forEach((memo) => {
        if (!memo.isDeleted) {
          //TODO: dleted memos should be filtered on the api side
          memosRes![memo.uuid] = memo;
        }
      });
      updateMemosDataMap(memosRes);
      return memosRes;
    }, 2000);

    return memosRes;
  };
}

export const memosService = new MemosService();
