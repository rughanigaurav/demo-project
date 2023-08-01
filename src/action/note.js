import { fetch } from "../service/fetch";

const getNotesDetails = () => {
  return fetch(
    {
      url: `/api/notes`,
    },
    "GET"
  );
};

const setNotesDetails = (notes) => {
  return fetch(
    {
      url: `/api/notes`,
      body: {
        body: notes
      },
    },
    "POST"
  );
};

export const setNotes = (payload) => ({
  type: "NOTE_SET",
  payload: {
    ...payload,
  },
});

export const getNote = () => (dispatch) => {
  getNotesDetails().then(data => {
    dispatch(setNotes({ notes: data.notes }));
  });
};

export const addNote = (notes) => (dispatch) => {
  setNotesDetails(notes);
  dispatch(setNotes({ notes: notes, isNotesModalOpen: false }));
};
