import { ReactNode } from "react";

import classes from "./box.module.css";

type BoxProps = {
  children: ReactNode;
};

export const Box = (props: BoxProps) => {
  const { children } = props;
  return <div className={classes.box}>{children}</div>;
};
