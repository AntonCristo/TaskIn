import { MouseEvent, ReactNode } from "react";
import { observer } from "mobx-react";

import { MenuListItem } from "../../dropdown-menu";
import { setDropdownMenuByNameOrNull } from "../../../../actions";

import classes from "./menu-wrapper.module.css";

type MenuWrapperProps = {
  children?: ReactNode;
  listItems: MenuListItem[];
  position: { top?: string; left?: string; right?: string; bottom?: string };
};

export const MenuWrapper = observer((props: MenuWrapperProps) => {
  const { listItems, position, children } = props;

  const preventClickEventPropogation = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      style={{ top: position.top, right: position.right }}
      onClick={preventClickEventPropogation}
      className={classes.menuWrapper}
    >
      {children ? (
        <div className={classes.childrenWrapper}>{children}</div>
      ) : null}
      {listItems.map((listItem, index) => {
        const resetOpenMenuAndExecuteClick = () => {
          setDropdownMenuByNameOrNull(null);
          listItem.onClick();
        };

        return (
          <li
            className={[
              classes.listItem,
              listItem.disabled && classes.disabled,
            ].join(" ")}
            onClick={resetOpenMenuAndExecuteClick}
            key={index + listItem.text}
          >
            {listItem.icon ? <img src={listItem.icon} alt="" /> : null}
            {listItem.text}
          </li>
        );
      })}
    </div>
  );
});