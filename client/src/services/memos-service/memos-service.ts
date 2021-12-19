import axios from "axios";
import { Uuid } from "src/client-types";
import { IMemoService } from "src/contracts";
import { MemosDataMap } from "src/stores";

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://taskin-rest-api.herokuapp.com";

class MemosService implements IMemoService {
  public getMemosFromApiByInitiatorUUID = async (userUUID: Uuid) => {
    const userMemosFromLocalStorageAsString = localStorage.getItem(
      `${userUUID}_memos`
    );

    if (!userMemosFromLocalStorageAsString) return null;

    const parsedUserMemosFromLocalStorage: MemosDataMap = JSON.parse(
      userMemosFromLocalStorageAsString
    );

    return parsedUserMemosFromLocalStorage;
  };

  public testApiPing = async () => {
    console.log(process.env);
    axios
      .get(API_BASE_URL + "/api")
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };

  public testInsertMockToDB = async () => {
    axios
      .post(API_BASE_URL + "/api/memos/mock")
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };
}

export const memosService = new MemosService();
