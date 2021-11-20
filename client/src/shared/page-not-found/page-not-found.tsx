import { TaskinTitle } from "..";
import classes from "./page-not-found.module.css";

export const PageNotFound = () => {
  return (
    <div className={classes.pageNotFound}>
      <TaskinTitle fontSize={36} />
      <div className={classes.pageNotFoundText}>Page Not Found</div>
      <div className={classes.notFoundCode}>404</div>
    </div>
  );
};
