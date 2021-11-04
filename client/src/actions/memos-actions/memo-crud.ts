import { action } from "mobx";
import { Memo, ValueOf } from "src/client-types";
import { MemosDataMap, memoStore } from "src/stores";

export const updateMemosDataMap = action((memosDataMapUpdate: MemosDataMap) => {
  memoStore.dataStoreInstance.memosMap = memosDataMapUpdate;
});

export const addNewValidatedMemoToMap = action(() => {
  //TDOD: after memo creation wizard is ready, this method should get
  //"MEMO" validated object, and add it to the map with upsert
  const newMemo = memoStore.dataStoreInstance.getMemoTemplate();

  const copyOfMemosDataMap = JSON.parse(
    JSON.stringify(memoStore.dataStoreInstance.memosMap)
  );

  copyOfMemosDataMap[newMemo.uuid] = newMemo;

  updateMemosDataMap(copyOfMemosDataMap);
  return newMemo.uuid;
});

export const getCopyOfMemoFromMap = action(
  (memoUUID: string): Memo | undefined => {
    const copyOfMemosDataMap: MemosDataMap = JSON.parse(
      JSON.stringify(memoStore.dataStoreInstance.memosMap)
    );

    return copyOfMemosDataMap[memoUUID];
  }
);

export const updateSingleMemo = action(
  (memoUUID: string, key: keyof Memo, value: ValueOf<Memo>) => {
    const copyOfMemosDataMap: MemosDataMap = JSON.parse(
      JSON.stringify(memoStore.dataStoreInstance.memosMap)
    );

    const memoFromMap: Memo | undefined = copyOfMemosDataMap[memoUUID];

    if (!memoFromMap) {
      throw Error(
        "[updateSingleMemo]:: updated memo does not exist in store map"
      );
    }

    const res = {
      ...copyOfMemosDataMap,
      [memoUUID]: {
        ...memoFromMap,
        [key]: value,
      },
    };

    updateMemosDataMap(res);
  }
);

export const deleteSingleMemoFromMap = action((memoUUID: string) => {
  const copyOfMemosDataMap: MemosDataMap = JSON.parse(
    JSON.stringify(memoStore.dataStoreInstance.memosMap)
  );

  delete copyOfMemosDataMap[memoUUID];

  updateMemosDataMap(copyOfMemosDataMap);
});
