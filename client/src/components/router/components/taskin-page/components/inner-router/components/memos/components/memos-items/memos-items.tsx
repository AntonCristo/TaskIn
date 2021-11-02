import { Memo } from "../../../../../../../../../../client-types";
import { MemoCard } from "./components";

import classes from "./memos-items.module.css";

const memoMocks: Memo[] = [
  {
    content: "Mock memo content, this text is a description of the memo card",
    createdBy: "asd-qwe234-asdassd-1qwerq",
    creationDate: new Date().getUTCMilliseconds(),
    dueDate: new Date().getUTCMilliseconds() + 860000,
    title: "Mock Mock",
    uuid: "zxc-yukyuk-2rrr23eds-r32re",
    version: "0.1",
    label: "Urgent",
  },
  {
    content:
      "Mock memo content, this text is a description of the memo card,Mock memo content, this text is a description of the memo card,Mock memo content, this text is a description of the memo card,Mock memo content, this text is a description of the memo card",
    createdBy: "asd-qwe234-asdassd-jaskldj",
    creationDate: new Date().getUTCMilliseconds(),
    dueDate: new Date().getUTCMilliseconds() + 860000,
    title: "My Memo",
    uuid: "zqc-yukyuk-2rrr23eds-r32re",
    version: "0.1",
    label: "Ok",
  },
];

export const MemosItems = () => {
  return (
    <div className={classes.memosItems}>
      {/* //TODO: add mobile memo card design */}
      {memoMocks.map((memo, index) => (
        <MemoCard key={memo.uuid} memo={memo} />
      ))}
    </div>
  );
};
