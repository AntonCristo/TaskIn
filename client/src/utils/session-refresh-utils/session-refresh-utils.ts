import { MemosDisplayClass } from "src/stores";
import { MemosSortingProfile } from "src/stores/memos-store/memos-ui-store";

type MemoUiElements =
  | {
      key: "QUICK_SEARCH";
      value: string;
    }
  | {
      key: "DISPLAY_CLASS";
      value: MemosDisplayClass | null;
    }
  | {
      key: "SORT";
      value: MemosSortingProfile | null;
    };

type SessionPersistState = {
  MEMO_UI_STORE: MemoUiElements[];
  // Ready for additinal stores
};

export const SESSION_UI_STATE_TEMPLATE: SessionPersistState = {
  MEMO_UI_STORE: [
    { key: "DISPLAY_CLASS", value: "IN_PROGRESS" },
    { key: "QUICK_SEARCH", value: "" },
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
