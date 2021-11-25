import { GoogleLogin } from "react-google-login";
import { routerLocationSetter } from "src/actions";
import { userStore } from "src/stores";

import classes from "./google-button.module.css";

const GOOGLE_CLIENT_ID =
  "344075084830-gtrfldn8ilbkt7grgktkd8rr7mtvq13k.apps.googleusercontent.com";

export const GoogleButton = () => {
  const { saveGoogleUserData } = userStore;

  const onSuccessfullLoginHandler = (googleResponse: any) => {
    saveGoogleUserData(googleResponse);
    routerLocationSetter("/taskin/memos");
  };

  const onUNsucessfullLoginHandler = (googleResponse: any) => {
    alert("Failed to login, check logged error in browsers console");
    console.log(googleResponse);
    routerLocationSetter("/");
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
