import moment from "moment";
import { fetch } from "../service/fetch";

export const getDownloadCenterDetails = async ({
  page,
  itemsPerPage,
  filterFileType,
  filterDate,
  filterSearch,
}) => {

  return await fetch(
    {
      url: `/api/export-request/user/${page}`,
      body: {
        file_type: filterFileType,
        created_at: filterDate ? moment(filterDate).format("YYYY-MM-DD") : "",
        file_name: filterSearch,
        page_size: itemsPerPage,
      },
    },
    "POST"
  );
};

export const deleteDownloadCenter = (id) => async (dispatch) => {
  try {
    await fetch(
      {
        url: `/api/export-request/${id}`,
      },
      "DELETE"
    );

    dispatch(setDownloadCenter({ isDeleteSuccess: true }));
  } catch (error) {
    dispatch(
      setDownloadCenter({
        isError: error.message,
      })
    );
  }
};

export const setDownloadCenter = (payload) => ({
  type: "DOWNLOAD_CENTER_SET",
  payload: {
    ...payload,
  },
});

export const setPagination = (payload) => ({
  type: "DOWNLOAD_CENTER_SET",
  payload: {
    ...payload,
  },
});

export const getPagination =
  (total, limit, page = 1) =>
  (dispatch) => {
    const totalPage = Math.ceil(total / limit);
    dispatch(setPagination({ totalPage, limit }));
  };

export const setPage = (page) => (dispatch) => {
  dispatch(setDownloadCenter({ page }));
};

export const fetchDownloadCenterData = () => async (dispatch, getState) => {
  const {
    downloadCenter: {
      itemsPerPage = 5,
      page = 1,
      filterFileType,
      filterDate,
      filterSearch,
    },
  } = getState();
  try {
    const response = await getDownloadCenterDetails({
      page,
      itemsPerPage,
      filterFileType,
      filterDate,
      filterSearch,
    });

    dispatch(
      setDownloadCenter({
        data: response.result,
        totalRecordsCount: response.totalRecords,
      })
    );
  } catch (error) {
    dispatch(
      setDownloadCenter({
        isError: error.message,
      })
    );
  }
};
