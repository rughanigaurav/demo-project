import { getHistoryDetails } from "./history";

export const setIncremental = (payload) => ({
  type: "INCREMENTAL_SET",
  payload: {
    ...payload,
  },
});

export const setPagination = (payload) => ({
  type: "INCREMENTAL_SET",
  payload: {
    ...payload,
  },
});

export const setSelectedRows = (selectedRows) => (dispatch) => {
  dispatch(setIncremental(selectedRows));
}

export const getPagination =
  (total, limit, page = 1) =>
    (dispatch) => {
      const totalPage = Math.ceil(total / limit);
      dispatch(setPagination({ totalPage, limit }));
    };


export const setPage = (page) => (dispatch) => {
  dispatch(setIncremental({ page }));
}

export const fetchIncrementalQueryDetails = (isInitial = false) => async (dispatch, getState) => {

  const { incrementalQuery: { itemsPerPage = 5, page = 1 } } = getState();
  let pageNo = 1;
  let pageSize = 5;

  if (!isInitial) {
    pageNo = page;
    pageSize = itemsPerPage;
  }
  try {
    const response = await getHistoryDetails(pageNo, pageSize);
    dispatch(setIncremental({
      data: response.result,
      totalRecordsCount: response.totalRecords
    }));

    if (isInitial) {
      const lastQueryString = (response.result && response.result[1] && { id: response.result[1].id, query: response.result[1].query}) || [];
      dispatch(setIncremental({
        displayQueryIncremental: [lastQueryString],
        modalQuery: [lastQueryString]
      }));
    }

  } catch (error) {
    dispatch(setIncremental({
      isError: error.message
    }));
  }
}
