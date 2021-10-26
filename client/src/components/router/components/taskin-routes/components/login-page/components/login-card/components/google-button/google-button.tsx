import classes from "./google-button.module.css";

export const GoogleButton = () => {
  //TODO: implement with window.gapi
  //create client id in google developers console
  //implement offline sign in
  //translate google payload into "Taskin" USER type
  //save to local storage on successful login => redirect to main page

  //Current behavior: Mock user is saved into local storage until google login is fully implemented
  return <div className={classes.googleButton}>Sign-in with google</div>;
};
