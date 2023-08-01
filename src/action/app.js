import { fetch } from "../service/fetch";

export const setApp = (payload) => ({
  type: "APP_SET",
  payload: {
    ...payload,
  },
});

export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const getUserProfile = () => async (dispatch) => {
  let response;

  try {
    response = await fetch(
      {
        url: `/api/user/profile`,
      },
      "GET"
    );

    if (response.name) {
      dispatch(setApp({ userName: response.name }));
    }
  } catch (error) {
    dispatch(
      setApp({
        isError: error.message,
      })
    );
  }
};

export const handleSetActiveTab = (hashKey, onSetApp, onSetQuery) => {
  const selectedTab = hashKey && hashKey.split("#");

  if (selectedTab && selectedTab.length > 1) {
    onSetApp({ activeTab: selectedTab[1] });
    onSetQuery({ syntaxqueryCorrect: "", syntaxqueryError: "" });
  }
};

export const deleteUserAnnotations = () => async (dispatch) => {
  try {
    await fetch(
      {
        url: `/api/text-annotate/`,
      },
      "DELETE"
    );
  } catch (error) {
    dispatch(
      setApp({
        isError: error.message,
      })
    );
  }
};
