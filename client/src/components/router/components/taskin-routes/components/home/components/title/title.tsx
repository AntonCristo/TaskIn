import React from "react";

import classes from "./title.module.css";

export const Title: React.FC = (props: {}) => {
  return (
    <div className={classes.overallTitle}>
      <div>
        <span className={classes.mainHeaderText}>T-Ask-In</span>
        <span className={classes.subText}>Create and manage tasks</span>
      </div>
    </div>
  );
};
