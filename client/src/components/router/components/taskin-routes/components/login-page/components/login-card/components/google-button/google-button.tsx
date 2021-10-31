import { GoogleLogin } from "react-google-login";

import { routerLocationSetter } from "../../../../../../../../../../actions";
import { userStore } from "../../../../../../../../../../stores";

import classes from "./google-button.module.css";

const GOOGLE_CLIENT_ID =
  "7392791014-jeh8om3gkge6e7eme8jts9j7gtcm6vsj.apps.googleusercontent.com";

export const GoogleButton = () => {
  const { saveGoogleUserData } = userStore;

  const onSuccessfullLoginHandler = (googleResponse: any) => {
    saveGoogleUserData(googleResponse);
    routerLocationSetter("/taskin");
  };

  const onUNsucessfullLoginHandler = (googleResponse: any) => {
    alert("Failed to login, check logged error in browsers console");
    console.log(googleResponse);
    routerLocationSetter("/home");
  };

  return (
    <div className={classes.googleButton}>
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        onSuccess={onSuccessfullLoginHandler}
        onFailure={onUNsucessfullLoginHandler}
      />
    </div>
  );
};
