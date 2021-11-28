import { MemosDisplayClass } from "src/stores";
import {
  FilterProfile,
  MemosSortingProfile,
} from "src/stores/memos-store/ui-store-types";

type MemoUiElements =
  | {
      key: "DISPLAY_CLASS";
      value: MemosDisplayClass | null;
    }
  | {
      key: "SORT";
      value: MemosSortingProfile | null;
    }
  | { key: "FILTER"; value: FilterProfile };

type SessionPersistState = {
  MEMO_UI_STORE: MemoUiElements[];
  // Ready for additinal stores
};

export const SESSION_UI_STATE_TEMPLATE: SessionPersistState = {
  MEMO_UI_STORE: [
    { key: "DISPLAY_CLASS", value: "IN_PROGRESS" },
    { key: "FILTER", value: {} },
    { key: "SORT", value: { sort: null, sortDirection: "UP" } },
  ],
};

const SESSION_REFRESH_KEY = "session_refresh";

export const getSessionPersistedUIState = () => {
  const sessionUIStateAsString = sessionStorage.getItem(SESSION_REFRESH_KEY);

  if (!sessionUIStateAsString) {
    sessionStorage.setItem(
      SESSION_REFRESH_KEY,
      JSON.stringify(SESSION_UI_STATE_TEMPLATE)
    );
    return null;
  }

  return JSON.parse(sessionUIStateAsString) as SessionPersistState;
};

export const setSessionPersistedUIState = (
  stateToPersistInSessionStorage: SessionPersistState
) => {
  const currentUIStateInSessionStorage: SessionPersistState =
    getSessionPersistedUIState() || SESSION_UI_STATE_TEMPLATE;

  const updateOrCurrent: SessionPersistState = {
    ...currentUIStateInSessionStorage,
    MEMO_UI_STORE:
      currentUIStateInSessionStorage.MEMO_UI_STORE?.map((uiElement) => {
        const keyUpdate = stateToPersistInSessionStorage.MEMO_UI_STORE?.find(
          (element) => element.key === uiElement.key
        );

        if (keyUpdate) {
          return keyUpdate;
        }

        return uiElement;
      }) || [],
  };

  sessionStorage.setItem(SESSION_REFRESH_KEY, JSON.stringify(updateOrCurrent));
};

export const resetPerssistedSessionStateOnLogout = () => {
  sessionStorage.setItem(
    SESSION_REFRESH_KEY,
    JSON.stringify(SESSION_UI_STATE_TEMPLATE)
  );
};
