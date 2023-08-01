import { displayError } from "../../service/display-error";
import { classes_suggestor } from "../../components/constant";
import { search } from "../../service/elasticSearch";
export const setClassesModal = (payload) => ({
  type: "CLASSES_SUGGESTOR_SET",
  payload: {
    ...payload,
  },
});

export const setPagination = (payload) => ({
  type: "CLASSES_SUGGESTOR_SET",
  payload: {
    ...payload,
  },
});

export const setSelectedRows = (selectedRows) => (dispatch) => {
  dispatch(setClassesModal(selectedRows));
};

export const getPagination =
  (total, limit, page = 1) =>
  (dispatch) => {
    const totalPage = Math.ceil(total / limit);
    dispatch(setPagination({ totalPage, limit }));
  };

export const setPage = (page) => (dispatch) => {
  dispatch(setClassesModal({ page }));
};

export const searchForClassAndKeyword = () => async (dispatch, getState) => {
  const {
    classesSuggestor: { formData = {}, classesType, dataFrom },
  } = getState();
  const queryObj = {
    classesAndkeywords: formData,
    classesType,
    dataFrom,
  };
  const body = JSON.stringify(queryObj);
  try {
    const data = await search(body, classes_suggestor);
    const dataResponse = data.data;
    const tableData = dataResponse.hits.hits;
    const total = dataResponse.hits.total.value;

    dispatch(
      setClassesModal({
        tableData,
        totalRecordsCount: total,
      })
    );
  } catch (error) {
    displayError(error);
  }
};
