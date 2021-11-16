import { observer } from "mobx-react";
import { memoStore } from "src/stores";

import { memosRouteAssistant } from "./config";

import classes from "./memos-route-assistant.module.css";

export const MemosRouteAssistant = observer(() => {
  const { dataStoreInstance } = memoStore;
  const _activeMemosDisplayClass = dataStoreInstance.memosDisplayClass;

  const displayAssistance = Object.keys(memosRouteAssistant);

  return (
    <div className={classes.memosRouteAssistant}>
      {displayAssistance.map((assistanceButtonName, index) => {
        return (
          <div
            key={assistanceButtonName + index}
            onClick={memosRouteAssistant[assistanceButtonName].onClick}
            className={[
              classes.assistButton,
              _activeMemosDisplayClass ===
                memosRouteAssistant[assistanceButtonName].memoDisplayClass &&
                classes.activeAssistButton,
            ].join(" ")}
            data-assist={
              memosRouteAssistant[assistanceButtonName].memoDisplayClass
            }
          >
            <div className={classes.buttonName}>{assistanceButtonName}</div>
            <div className={classes.displayClassCounter}>
              {
                memoStore.dataStoreInstance.getMemosMapAsArrayByDisplayClass(
                  memosRouteAssistant[assistanceButtonName].memoDisplayClass
                )?.length
              }
            </div>
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
