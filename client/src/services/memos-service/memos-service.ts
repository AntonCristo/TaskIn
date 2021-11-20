import { Uuid } from "src/client-types";
import { IMemoService } from "src/contracts";
import { MemosDataMap } from "src/stores";

class MemosService implements IMemoService {
  public getMemosFromApiByInitiatorUUID = async (userUUID: Uuid) => {
    const userMemosFromLocalStorageAsString = localStorage.getItem(
      `${userUUID}_memos`
    );

    if (!userMemosFromLocalStorageAsString) return null;

    const parsedUserMemosFromLocalStorage: MemosDataMap = JSON.parse(
      userMemosFromLocalStorageAsString
    );

    return parsedUserMemosFromLocalStorage;
  };
}

export const memosService = new MemosService();
