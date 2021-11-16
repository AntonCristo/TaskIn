import { MouseEvent } from "react";
import { memoUIActions, mobileToggleMainMenuVisibility } from "src/actions";
import { MemosDisplayClass } from "src/stores/memos-store/memo-data-store";
import myMemosIcon from "src/assets/svg/memo_24dp.svg";
import progressIcon from "src/assets/svg/hourglass_24dp.svg";
import completedIcon from "src/assets/svg/done_24dp.svg";
import trashIcon from "src/assets/svg/delete_24dp.svg";

const onClickHandler = (event: MouseEvent<HTMLDivElement>) => {
  const clickedAssistanceButton =
    event.currentTarget.getAttribute("data-assist");
  if (!clickedAssistanceButton) {
    throw Error("[onClickHandler]:: somthing unexpected happen, debug!");
  }

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
  All: {
    memoDisplayClass: "ALL",
    icon: myMemosIcon,
    onClick: onClickHandler,
  },
  "In progress": {
    memoDisplayClass: "IN_PROGRESS",
    icon: progressIcon,
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
