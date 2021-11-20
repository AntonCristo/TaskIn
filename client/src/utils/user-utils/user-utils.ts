import { User } from "src/client-types";

export const getUserFromLocalStorage = (): User | null => {
  const userFromLocalStorage = localStorage.getItem("userData");

  if (!userFromLocalStorage) return null;

  return JSON.parse(userFromLocalStorage) as User;
};
