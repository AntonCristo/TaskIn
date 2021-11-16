import { observer } from "mobx-react";
import { memoStore } from "src/stores";
import { MemosDisplayClass } from "src/stores/memos-store/memo-data-store";
import myMemosIcon from "src/assets/svg/memo_24dp.svg";
import progressIcon from "src/assets/svg/hourglass_24dp.svg";
import completedIcon from "src/assets/svg/done_24dp.svg";
import trashIcon from "src/assets/svg/delete_24dp.svg";

import classes from "./memos-route-assistant.module.css";

export const MemosRouteAssistant = observer(() => {
  const { dataStoreInstance } = memoStore;
  const _activeMemosDisplayClass = dataStoreInstance.memosDisplayClass;

  const memosRouteAssistant: {
    [x: string]: { memoDisplayClass: MemosDisplayClass; icon?: string };
  } = {
    All: {
      memoDisplayClass: "ALL",
      icon: myMemosIcon,
    },
    "In progress": {
      memoDisplayClass: "IN_PROGRESS",
      icon: progressIcon,
    },
    Completed: {
      memoDisplayClass: "COMPLETED",
      icon: completedIcon,
    },
    Trash: {
      memoDisplayClass: "TRASH",
      icon: trashIcon,
    },
  };

  const displayAssistance = Object.keys(memosRouteAssistant);

  return (
    <div className={classes.memosRouteAssistant}>
      {displayAssistance.map((assistanceButtonName, index) => {
        return (
          <div
            className={[
              classes.assistButton,
              _activeMemosDisplayClass ===
                memosRouteAssistant[assistanceButtonName].memoDisplayClass &&
                classes.activeAssistButton,
            ].join(" ")}
            data-assist={
              memosRouteAssistant[assistanceButtonName].memoDisplayClass
            }
            key={assistanceButtonName + index}
          >
            {assistanceButtonName}
            {memosRouteAssistant[assistanceButtonName].icon ? (
              <img
                src={memosRouteAssistant[assistanceButtonName].icon}
                alt="assistance-icon"
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
});
