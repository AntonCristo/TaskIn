import dayjs from "dayjs";
import { updateMemosDataMap } from "../../actions/memos-actions/memo-crud";
import { Memo } from "../../client-types";
import { IMemoService } from "../../contracts";
import { MemosDataMap } from "../../stores";

const memoMocks: Memo[] = [
  {
    content: "Mock memo content, this text is a description of the memo card",
    createdBy: "asd-qwe234-asdassd-1qwerq",
    creationDate: dayjs().valueOf(),
    dueDate: dayjs().add(4, "day").valueOf(),
    title: "Mock Mock",
    uuid: "zxc-yukyuk-2rrr23eds-r32re",
    version: "0.1",
    label: "Urgent",
    isDone: false,
  },
  {
    content:
      "Mock memo content, this text is a description of the memo card,Mock memo content, this text is a description of the memo card,Mock memo content, this text is a description of the memo card,Mock memo content, this text is a description of the memo card",
    createdBy: "asd-qwe234-asdassd-jaskldj",
    creationDate: dayjs().valueOf(),
    dueDate: dayjs().add(4, "day").valueOf(),
    title: "My Memo 12",
    uuid: "zqc-yukyuk-2rrr23eds-r32re",
    version: "0.1",
    label: "Ok",
    isDone: true,
  },
  {
    content:
      "Mock memo content, this text is a description of the memo card,Mock memo content, this text is a description of the memo card,Mock memo content, this text is a description of the memo card,Mock memo content, this text is a description of the memo card",
    createdBy: "asd-qwe234-asdassd-jaskldj",
    creationDate: dayjs().valueOf(),
    dueDate: dayjs().add(4, "day").valueOf(),
    title: "My Memo 25",
    uuid: "zql-yukyuk-2rrr23eds-r32re",
    version: "0.1",
    label: "Ok",
    isDone: true,
  },
  {
    content:
      "Mock memo content, this text is a description of the memo card,Mock memo content, this text is a description of the memo card,Mock memo content, this text is a description of the memo card,Mock memo content, this text is a description of the memo card",
    createdBy: "asd-qwe234-asdassd-jaskldj",
    creationDate: dayjs().valueOf(),
    dueDate: dayjs().add(4, "day").valueOf(),
    title: "My Memo",
    uuid: "zqz-yukyuk-2rrr23eds-r32re",
    version: "0.1",
    label: "Ok",
    isDone: false,
  },
];

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
        memosRes![memo.uuid] = memo;
      });
      updateMemosDataMap(memosRes);
      return memosRes;
    }, 2000);

    return memosRes;
  };
}

export const memosService = new MemosService();
