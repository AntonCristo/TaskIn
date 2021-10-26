import { v4 as uuid } from "uuid";
import { action } from "mobx";

import { User } from "../../client-types";

const USER_TEMPLATE: User = {
  uuid: uuid(),
  fullName: "",
  email: "",
};

class UserStore {
  private getMockUser = () => {
    const mockUser: User = JSON.parse(JSON.stringify(USER_TEMPLATE));
    mockUser.email = "mock_user@example.com";
    mockUser.fullName = "Mock User";

    return mockUser;
  };

  //TODO: remove after google sign in implementation
  public saveMockUser = () => {
    localStorage.setItem("userData", JSON.stringify(this.getMockUser()));
  };

  public getMockUserFromLocalStorage = (): User | null => {
    const userFromLocalStorage: string | null =
      localStorage.getItem("userData");

    let parsedMockUser: User | null = userFromLocalStorage
      ? JSON.parse(userFromLocalStorage)
      : null;

    return parsedMockUser;
  };

  public clearUserFromLocalStorage = action(() => {
    localStorage.removeItem("userData");
  });
}

export const userStore = new UserStore();
