import { patent_detials } from "../components/constant";
import { search } from "../service/elasticSearch";

export const setItemPerPage = (payload) => ({
  type: "RESULT_SET",
  payload: {
    ...payload,
  },
});

export const setPagination = (payload) => ({
  type: "RESULT_SET",
  payload: {
    ...payload,
  },
});

export const setDetails = (payload) => ({
  type: "RESULT_SET",
  payload: {
    ...payload,
  },
});
export const isObjectBlank = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};
export const setPatentDetails = (id) => async (dispatch) => {
  const queryObj = {
    queryToSearch: id,
  };
  const body = JSON.stringify(queryObj);

  const dataResponse = await search(body, patent_detials);
  if (dataResponse.data.hits.hits[0]) {
    const data = {
      ...dataResponse.data.hits.hits[0]._source,
      ...dataResponse.data.hits.hits[0].highlight,
    };
    return dispatch(
      // setDetails({ detailsData: dataResponse.data.hits.hits[0]._source })
      setDetails({ detailsData: data })
    );
  } else {
    window.location.href = "/";
  }

  return null;
};

export const getPagination =
  (total, limit, page = 1) =>
  (dispatch) => {
    const totalPage = Math.ceil(total / limit);
    dispatch(setPagination({ totalPage, limit }));
  };

export const getInitSortKey = (fieldList = {}) => {
  const sortIndex = fieldList.id;
  if (sortIndex) {
    return sortIndex.type === "text" ? `id.keyword` : "id";
  }
  const firstKey = Object.keys(fieldList)[0];
  return fieldList[firstKey].type === "text" ? `${firstKey}.keyword` : firstKey;
};

export const setSelectedRows = (payload) => ({
  type: "RESULT_SET",
  payload: {
    ...payload,
  },
});

export const setSelectAllRecord = (payload) => ({
  type: "RESULT_SET",
  payload: {
    ...payload,
  },
});

export const setPatentId = (payload) => ({
  type: "RESULT_SET",
  payload: {
    ...payload,
  },
});

export const setFilterFields = (payload) => ({
  type: "RESULT_SET",
  payload: {
    ...payload,
  },
});

export const sortDropdown = (sortBy, sortType) => (dispatch) => {
  const newSortBy = sortBy === "score" ? "_score" : sortBy;
  return dispatch(setFilterFields({ sortBy: newSortBy, sortType }));
};
export const updateColumnWidth = (header, width) => ({
  type: "RESULT_SET",
  payload: {
    columnWidths: {
      [header]: width,
    },
  },
});
