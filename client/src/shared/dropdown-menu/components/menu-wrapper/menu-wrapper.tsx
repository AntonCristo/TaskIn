import React, {
  MouseEvent,
  ReactNode,
  RefObject,
  useEffect,
  KeyboardEvent,
} from "react";
import { observer } from "mobx-react";
import { setDropdownMenuByNameOrNull } from "src/actions";

import { MenuListItem } from "../../dropdown-menu";

import classes from "./menu-wrapper.module.css";

type MenuWrapperProps = {
  children?: ReactNode;
  listItems: MenuListItem[];
  position: { top?: string; left?: string; right?: string; bottom?: string };
};

export const MenuWrapper = observer((props: MenuWrapperProps) => {
  const { listItems, position, children } = props;
  const menuWrapperRef: RefObject<HTMLDivElement> = React.createRef();

  const preventClickEventPropogation = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const onKeyDownHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setDropdownMenuByNameOrNull(null);
      return;
    }
  };

  const resetOpenMenuAndExecuteClick = (listItem: MenuListItem) => {
    setDropdownMenuByNameOrNull(null);
    !listItem.disabled && listItem.onClick();
  };

  const onListItemKeyDownHandler = (
    event: KeyboardEvent<HTMLLIElement>,
    listItem: MenuListItem
  ) => {
    if (event.key === "Enter") {
      if (!listItem.disabled) {
        setDropdownMenuByNameOrNull(null);
        listItem.onClick();
      }

      return;
    }
  };

  //[useEffect]:: gain focus abilities on render
  useEffect(() => {
    menuWrapperRef.current && menuWrapperRef.current?.focus();
  }, [menuWrapperRef]);

  return (
    <div
      tabIndex={0}
      onKeyDown={onKeyDownHandler}
      ref={menuWrapperRef}
      style={{ top: position.top, right: position.right, left: position.left }}
      onClick={preventClickEventPropogation}
      className={classes.menuWrapper}
    >
      {children ? (
        <div className={classes.childrenWrapper}>{children}</div>
      ) : null}
      {listItems.map((listItem, index) => {
        return (
          <li
            tabIndex={0}
            onKeyDown={(event) => onListItemKeyDownHandler(event, listItem)}
            className={[
              classes.listItem,
              listItem.disabled && classes.disabled,
            ].join(" ")}
            onClick={() => resetOpenMenuAndExecuteClick(listItem)}
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
