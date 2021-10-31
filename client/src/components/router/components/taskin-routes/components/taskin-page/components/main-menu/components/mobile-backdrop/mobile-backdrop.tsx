import classes from "./mobile-backdrop.module.css";

type MobileBackdropProps = {
  onClick: () => void;
};

export const MobileBackdrop = (props: MobileBackdropProps) => {
  const { onClick } = props;
  return <div onClick={onClick} className={classes.mobileBackdrop}></div>;
};
