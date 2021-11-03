import classes from "./spinner.module.css";

export const Spinner = () => {
  return (
    <div className={classes.ldsEllipsis}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
