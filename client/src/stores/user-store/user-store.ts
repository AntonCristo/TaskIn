import { action } from "mobx";

import { User } from "../../client-types";

const USER_TEMPLATE: User = {
  version: "0.1",
  uuid: "",
  issuer: "GOOGLE",
  fullName: "",
  email: "",
  apiAccessToken: "",
};

class UserStore {
  public saveGoogleUserData = (googleAuthResponse: any) => {
    try {
      const newUserTemplate = { ...USER_TEMPLATE };

      newUserTemplate.uuid = googleAuthResponse.profileObj.googleId;
      newUserTemplate.apiAccessToken = googleAuthResponse.accessToken;
      newUserTemplate.email = googleAuthResponse.profileObj.email;
      newUserTemplate.fullName = googleAuthResponse.profileObj.name;

      localStorage.setItem("userData", JSON.stringify(newUserTemplate));
    } catch (error) {
      console.log(error);
      throw Error("[saveGoogleUserData]:: Check console.log");
    }
  };

  public getUserFromLocalStorage = (): User | null => {
    const userFromLocalStorage: string | null =
      localStorage.getItem("userData");

    let parsedUser: User | null = userFromLocalStorage
      ? JSON.parse(userFromLocalStorage)
      : null;

    return parsedUser;
  };

  public clearUserFromLocalStorage = action(() => {
    localStorage.removeItem("userData");
  });
}

export const userStore = new UserStore();
