import { observer } from "mobx-react";

import { MemosHeader, MemosItems } from "./components";

import classes from "./memos.module.css";

export const Memos = observer(() => {
  return (
    <div className={classes.memos}>
      <MemosHeader />
      <MemosItems />
    </div>
  );
});
