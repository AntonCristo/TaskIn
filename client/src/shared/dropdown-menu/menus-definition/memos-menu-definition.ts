import { MenuListItem } from "src/shared";
import unfoldMoreIcon from "src/assets/svg/unfold_more_24dp.svg";
import unfoldLessIcon from "src/assets/svg/unfold_less_24dp.svg";
import { memoUIActions } from "src/actions";

const collapseAllMemos = () => {
  memoUIActions.shouldCollapseAllMemos(true);
};

const expandAllMemos = () => {
  memoUIActions.shouldCollapseAllMemos(false);
};

export const memosMenuListItems: MenuListItem[] = [
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
