import { MenuListItem } from "src/shared";
import {
  memosCrudActions,
  memoUIActions,
  notificationActions,
  routerLocationSetter,
} from "src/actions";
import unfoldMoreIcon from "src/assets/svg/unfold_more_24dp.svg";
import unfoldLessIcon from "src/assets/svg/unfold_less_24dp.svg";
import sortIcon from "src/assets/svg/sort_24dp.svg";
import filterIcon from "src/assets/svg/filter_list_24dp.svg";

const collapseAllMemos = () => {
  memoUIActions.shouldCollapseAllMemos(true);
};

const expandAllMemos = () => {
  memoUIActions.shouldCollapseAllMemos(false);
};

const sortMemos = () => {
  routerLocationSetter("/taskin/memos/sort");
};

const filterMemos = () => {
  routerLocationSetter("/taskin/memos/filter");
};

export const popClearTrashConfirmation = () => {
  notificationActions.popNotificationForUser(
    "",
    "Are you sure you want to clear your deleted memos ?",
    memosCrudActions.deleteMemosLocatedInTrash
  );
};

export const popMoveAllCompletedToTrashConfirmation = () => {
  notificationActions.popNotificationForUser(
    "",
    "Are you sure you want to move ALL your completed memos to the trash ?",
    memosCrudActions.moveCompletedMemosToTrashTrash
  );
};

export const addNewMemoToMapWithoutValidation = () => {
  const newMemoUUID = memosCrudActions.addNewValidatedMemoToMap();
  memoUIActions.initSingleMemoCollapseState(newMemoUUID);

  setTimeout(() => {
    memoUIActions.scrollToViewNewAddedMemo(newMemoUUID);
  }, 0);
};

export const memosMenuListItems: MenuListItem[] = [
  {
    disabled: false,
    onClick: filterMemos,
    text: "Filter",
    icon: filterIcon,
  },
  {
    disabled: false,
    onClick: sortMemos,
    text: "Sort",
    icon: sortIcon,
  },
  {
    disabled: false,
    onClick: expandAllMemos,
    text: "Expand All",
    icon: unfoldMoreIcon,
  },
  {
    disabled: false,
    onClick: collapseAllMemos,
    text: "Collapse All",
    icon: unfoldLessIcon,
  },
];
