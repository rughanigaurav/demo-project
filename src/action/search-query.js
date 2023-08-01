export const setQuery = (payload) => ({
  type: "QUERY_SET",
  payload: {
    ...payload,
  },
});

export const setAllField = (payload) => ({
  type: "QUERY_SET",
  payload: {
    ...payload,
  }
});

