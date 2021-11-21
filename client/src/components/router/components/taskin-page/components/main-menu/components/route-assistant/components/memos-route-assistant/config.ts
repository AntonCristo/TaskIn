import { MouseEvent } from "react";
import {
  memoUIActions,
  mobileToggleMainMenuVisibility,
  routerLocationSetter,
} from "src/actions";
import { MemosDisplayClass } from "src/stores/memos-store/memo-data-store";
import myMemosIcon from "src/assets/svg/memo_24dp.svg";
import progressIcon from "src/assets/svg/hourglass_24dp.svg";
import completedIcon from "src/assets/svg/done_24dp.svg";
import trashIcon from "src/assets/svg/delete_24dp.svg";
import { setSessionPersistedUIState } from "src/utils";

const onClickHandler = (event: MouseEvent<HTMLDivElement>) => {
  const clickedAssistanceButton =
    event.currentTarget.getAttribute("data-assist");
  if (!clickedAssistanceButton) {
    throw Error("[onClickHandler]:: somthing unexpected happen, debug!");
  }

  setSessionPersistedUIState({
    MEMO_UI_STORE: [
      {
        key: "DISPLAY_CLASS",
        value: clickedAssistanceButton as MemosDisplayClass,
      },
    ],
  });
  routerLocationSetter("/taskin/memos");

  mobileToggleMainMenuVisibility();
  memoUIActions.setMemosDisplayClass(
    clickedAssistanceButton as MemosDisplayClass
  );
};

export const memosRouteAssistant: {
  [x: string]: {
    onClick: (event: MouseEvent<HTMLDivElement>) => void;
    memoDisplayClass: MemosDisplayClass;
    icon?: string;
  };
} = {
  "In progress": {
    memoDisplayClass: "IN_PROGRESS",
    icon: progressIcon,
    onClick: onClickHandler,
  },
  All: {
    memoDisplayClass: "ALL",
    icon: myMemosIcon,
    onClick: onClickHandler,
  },
  Completed: {
    memoDisplayClass: "COMPLETED",
    icon: completedIcon,
    onClick: onClickHandler,
  },
  Trash: {
    memoDisplayClass: "TRASH",
    icon: trashIcon,
    onClick: onClickHandler,
  },
};
