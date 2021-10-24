import classes from "./card.module.css";

type CardProps = {
  imageSrc?: string;
};

export const Card = (props: CardProps) => {
  const { imageSrc } = props;

  return (
    <div className={classes.defaultCardStyle}>
      {imageSrc ? <img src={imageSrc} alt="card" /> : <div>No image</div>}
      {/* card bottom is 40px height */}
    </div>
  );
};
