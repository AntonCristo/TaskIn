import { ReactNode } from "react";

import classes from "./elements-box.module.css";

type ElementsBoxProps = {
  children: ReactNode;
};

export const ElementsBox = (props: ElementsBoxProps) => {
  const { children } = props;

  return <div className={classes.elementsBox}>{children}</div>;
};
