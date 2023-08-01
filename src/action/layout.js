export const setField = (payload) => ({
  type: "APP_SET",
  payload: {
    ...payload,
  },
});

export const clearQuery = (dispatch, id) => {
  dispatch({
    type: "setWidget",
    key: id,
    needsQuery: true,
    needsConfiguration: true,
    isFacet: true,
    wantResults: false,
    query: { bool: { should: [] } },
    value: [],
    configuration: {},
    result: [],
  });
};


export const setHeaderRedirection = (payload) => ({
  type: "APP_SET",
  payload: {
    ...payload,
  },
});