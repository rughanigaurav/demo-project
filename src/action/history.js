/* eslint-disable no-useless-escape */

import { fetch } from "../service/fetch";
import moment from "moment";
import { uuidv4 } from "./app";
import {
  dropdownFieldsCodes,
  dropdownFieldsPlaceholders,
} from "../common/field-map";
import exportFromJSON from "export-from-json";
import { count } from "../components/constant";
import { displayError } from "../service/display-error";
import { search } from "../service/elasticSearch";
import {
  pubValues,
  resetFields,
  stateValues,
  statusValues,
  typeValues,
} from "../resources/data/options";

export const getHistoryDetails = async (page, itemsPerPage) => {
  return await fetch(
    {
      url: `/api/query-history/user/${page}?page_size=${itemsPerPage}`,
    },
    "GET"
  );
};

export const setHistory = (payload) => ({
  type: "HISTORY_SET",
  payload: {
    ...payload,
  },
});

export const setPagination = (payload) => ({
  type: "HISTORY_SET",
  payload: {
    ...payload,
  },
});

export const fetchHistory = () => async (dispatch, getState) => {
  const {
    historyTable: { itemsPerPage = 10, page = 1 },
  } = getState();
  try {
    const response = await getHistoryDetails(page, itemsPerPage);

    dispatch(
      setHistory({
        data: response.result,
        totalRecordsCount: response.totalRecords,
      })
    );
  } catch (error) {
    dispatch(
      setHistory({
        isError: error.message,
      })
    );
  }
};

export const addHistory = async ({ query, numberOfHits }) => {
  try {
    return await fetch({
      url: "/api/query-history",
      body: {
        query,
        numberOfHits,
      },
    });
  } catch (e) {}
};

export const deleteHistory = (id) => async (dispatch) => {
  try {
    await fetch(
      {
        url: `/api/query-history/${id}`,
      },
      "DELETE"
    );

    dispatch(setHistory({ isDeleteSuccess: true }));
  } catch (error) {
    dispatch(
      setHistory({
        isError: error.message,
      })
    );
  }
};
export const reRunHistory = async (id) => {
  try {
    await fetch(
      {
        url: `/api/query-history/${id}`,
        body: {
          userSearchNumber: id,
        },
      },
      "PUT"
    );
  } catch (error) {}
};

export const bookmarkHistory =
  (id, isBookmark) => async (dispatch, getState) => {
    try {
      const {
        historyTable: { data },
      } = getState();

      await fetch(
        {
          url: `/api/query-history/${id}`,
          body: {
            isBookmark,
          },
        },
        "PUT"
      );

      const updatedData = data.map((item) => {
        if (`${item.id}` === `${id}`) {
          item.isBookmark = isBookmark;
        }

        return item;
      });

      dispatch(
        setHistory({
          data: updatedData,
        })
      );
    } catch (error) {
      dispatch(
        setHistory({
          isError: error.message,
        })
      );
    }
  };

export const getPagination =
  (total, limit, page = 1) =>
  (dispatch) => {
    const totalPage = Math.ceil(total / limit);
    dispatch(setPagination({ totalPage, limit }));
  };

export const setPage = (page) => (dispatch) => {
  dispatch(setHistory({ page }));
};

const filterAndOrderFields = (data, selectedRows) => {
  let exportArray = [];

  // eslint-disable-next-line array-callback-return
  data.map((v) => {
    if (selectedRows.includes(`${v.id}`) || selectedRows.length === 0) {
      let exportInnerArray = [];

      exportInnerArray.push(v.id);

      exportArray.push({
        Numbers: v.userSearchNumber,
        Records: v.numberOfHits,
        "Search Query": v.query,
        "Date & Time": moment.unix(v.createdAt).format("DD-MM-YYYY HH:mm:ss"),
      });
    }
  });

  return exportArray;
};

export const exportHistory = () => (dispatch, getState) => {
  const {
    historyTable: { data, selectedRows, selectedItemList },
  } = getState();
  let exportFileName = `ResearchWire_${Math.round(
    new Date().getTime() / 1000
  )}`;

  exportFromJSON({
    data: filterAndOrderFields(
      selectedItemList.length ? selectedItemList : data,
      selectedRows
    ),
    fileName: exportFileName,
    exportType: "csv",
  });
};

export const setSelectedRows = (selectedRows) => (dispatch) => {
  dispatch(setHistory(selectedRows));
};

export const getQueryCount = async (query) => {
  const queryObj = {
    queryToSearch: query,
  };
  const body = JSON.stringify(queryObj);

  try {
    const data = await search(body, count);
    return data.data;
  } catch (error) {
    displayError(error);
    return false;
  }
};

export const updateQueryCount = (id, query) => async (dispatch, getState) => {
  const queryObj = {
    queryToSearch: query,
  };
  const body = JSON.stringify(queryObj);

  try {
    const data = await search(body, count);
    try {
      await fetch(
        {
          url: `/api/query-history/${id}`,
          body: {
            query,
            numberOfHits: data.data.count,
          },
        },
        "PUT"
      );
      dispatch(setHistory({ isEditSuccess: true }));
    } catch (error) {
      dispatch(
        setHistory({
          isEditError: error.message,
        })
      );
    }
  } catch (error) {
    displayError(error);
    return false;
  }
};

export const getRemainingTextFields = (
  list = [],
  editField = [],
  fieldedData = []
) => {
  if (editField.length >= fieldedData.length) return [];

  let remainingTextFields = [];
  let len = 0;
  let textField;
  let classesField;
  let assigneeField;
  let inventorField;
  let fieldObject = {
    id: uuidv4(),
    lang: "eng",
    dattype: "Text",
    error: "",
    operatersvalue: "AND",
    filedsinput: "",
  };

  if (!list.includes("Text")) {
    textField = {
      ...fieldObject,
      type: "Text",
      query: "ALL",
      placeholder: "E.g. Wireless OR Mobile",
      textLabel: "Text",
    };
    len = len + 1;
  }
  if (editField.length + len !== fieldedData.length) {
    if (!list.includes("Classes") && !list.includes("IPC/CPC ")) {
      classesField = {
        ...fieldObject,
        type: "Classes",
        query: "PCL",
        placeholder: "E.g. H04W25/00",
        textLabel: "Classification",
      };
      len = len + 1;
    }
  }

  if (editField.length + len !== fieldedData.length) {
    if (!list.includes("Assignee/Applicant")) {
      assigneeField = {
        ...fieldObject,
        type: "Assignee/Applicant",
        query: "AAP",
        placeholder: "E.g. Samsung OR Nokia",
        textLabel: "People/Organization",
      };
      len = len + 1;
    }
  }
  if (editField.length + len !== fieldedData.length) {
    if (!list.includes("Inventor")) {
      inventorField = {
        ...fieldObject,
        type: "Inventor",
        query: "IN",
        placeholder: "E.g. Bikram Kumar",
        textLabel: "People/Organization",
      };
      len = len + 1;
    }
  }
  if (
    textField !== undefined ||
    classesField !== undefined ||
    assigneeField !== undefined ||
    inventorField !== undefined
  ) {
    remainingTextFields.push(
      ...[
        textField !== undefined && textField,
        classesField !== undefined && classesField,
        assigneeField !== undefined && assigneeField,
        inventorField !== undefined && inventorField,
      ].filter(Boolean)
    );
  }
  return remainingTextFields;
};
export const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

export const getType = (code, query) => {
  let temp = getKeyByValue(dropdownFieldsCodes, code);
  const dropdownShortCodes = ["LST", "ALD", "PTS", "PT"];
  if (temp) {
    if (temp.includes("Date") || temp.includes("Year")) {
      if (query.includes(">=") || query.includes("<=")) {
        return "Date";
      } else {
        return "Text";
      }
    } else if (
      temp.includes("State") ||
      temp.includes("Country") ||
      temp.includes("National")
    ) {
      return "Country";
    } else if (dropdownShortCodes.includes(temp)) {
      return "dropdown";
    } else {
      return "Text";
    }
  } else return "Text";
};
export const getScode = (str) => {
  // eslint-disable-next-line no-useless-escape
  let newLabel = str.match(/([^=]+)(?=\>\=|\<\=|\=)/)
    ? str.match(/([^=]+)(?=\>\=|\<\=|\=)/)[1]
    : ""; /// extract the text before "="
  let Scode = newLabel.replace(/[^a-zA-Z ]/g, "");
  return Scode;
};

export const getQueryinsideBrackets = (str = "") => {
  let newQuery = str.match(/(?<=\().*(?=\))/gim)
    ? str.match(/(?<=\().*(?=\))/gim)[0]
    : "";

  return newQuery;
};
export const getEditFields = (
  query = "",
  chunksArray = [],
  operatorsArray = [],
  fieldData = resetFields
) => {
  let editField = [];
  const operatorsValidValues = ["and", "or", "not"];
  let dateCount = 0;
  let countryCount = 0;
  let dateObject = {
    id: uuidv4(),
    lang: "eng",
    error: "",
    textLabel: "newLabel",
    filedsinput: "",
  };
  let stateObj = {
    id: uuidv4(),
    name: "State",
    code: "state",
    type: "dropdown",
    query: "ALD",
    filedsinput: "",
    operatersvalue: "AND",
  };
  let statusObj = {
    id: uuidv4(),
    name: "Status",
    type: "dropdown",
    code: "status",
    query: "LST",
    filedsinput: "",
    operatersvalue: "AND",
  };
  let typeObj = {
    id: uuidv4(),
    name: "Type",
    code: "type",
    type: "dropdown",
    query: "PTS",
    filedsinput: "",
    operatersvalue: "AND",
  };
  let pubObj = {
    id: uuidv4(),
    name: "Pub",
    type: "dropdown",
    query: "PT",
    filedsinput: "",
    operatersvalue: "AND",
    code: "pub",
  };

  let textFieldsList = [];
  // eslint-disable-next-line array-callback-return
  chunksArray.map((originalQuery, index) => {
    query =
      originalQuery &&
      originalQuery
        .replaceAll("( ", "(")
        .replaceAll(" )", ")")
        .replaceAll(/:/gi, "");
    let newQuery = getQueryinsideBrackets(query); // extract the query text part
    // eslint-disable-next-line no-useless-escape
    let newLabel = query.match(/([^=]+)(?=\>\=|\<\=|\=)/)
      ? query.match(/([^=]+)(?=\>\=|\<\=|\=)/)[1]
      : ""; /// extract the text before "="
    let Scode = newLabel.replace(/[^a-zA-Z\_ ]/g, "");
    let newdattype = getType(
      newLabel.replace(/[^\_a-zA-Z ]/g, ""),
      originalQuery
    ); //regex to remove special characters
    let buttonText = getKeyByValue(
      dropdownFieldsCodes,
      newLabel.replace(/[^\_a-zA-Z ]/g, "").toUpperCase()
    );
    textFieldsList.push(buttonText && buttonText);

    if (newdattype === "Date") {
      const regex = /^\d+$/;
      const dateobj =
        newQuery.length >= 4 && newQuery.length <= 8 && regex.test(newQuery)
          ? new Date(moment(newQuery).format("LL"))
          : "";
      dateCount++;
      if (
        query.includes(">=") &&
        chunksArray[index + 1] &&
        chunksArray[index + 1].includes("<=") &&
        operatorsArray[index] &&
        operatorsArray[index].toUpperCase() === "AND" &&
        Scode === getScode(chunksArray[index + 1] && chunksArray[index + 1])
      ) {
        let nextQuery = chunksArray[index + 1];
        let endDate = getQueryinsideBrackets(nextQuery).trim();
        chunksArray.splice(index + 1, 1);
        operatorsArray.splice(index + 1, 1);
        var startDate = new Date(moment(newQuery).format("LL"));
        endDate =
          endDate.length >= 4 && endDate.length <= 8 && regex.test(endDate)
            ? new Date(moment(endDate).format("LL"))
            : "";
        let temp = {
          ...dateObject,
          type: buttonText ? buttonText : newLabel.replace(/[^a-zA-Z ]/g, ""), // dropdown label
          dattype: newdattype, // text or date or country
          query: Scode, // which goes in textarea
          operatersvalue: "AND",
          placeholder: "Enter Text here",
          startdate: startDate,
          enddate: endDate,
          dateerror:
            startDate >= endDate
              ? "Please select date field and valid date"
              : false,
        };
        editField.push(temp);
      } else if (
        query.includes(">=") &&
        chunksArray[index + 1] &&
        !chunksArray[index + 1].includes("<=")
      ) {
        let temp = {
          ...dateObject,
          type: buttonText ? buttonText : newLabel.replace(/[^a-zA-Z ]/g, ""), // dropdown label
          dattype: newdattype, // text or date or country
          query: Scode, // which goes in
          operatersvalue: operatorsArray[index]
            ? operatorsValidValues.includes(operatorsArray[index].toLowerCase())
              ? operatorsArray[index].toUpperCase()
              : "AND"
            : "AND",
          startdate: dateobj,
          enddate: "",
        };

        editField.push(temp);
      } else if (query.includes("<=")) {
        let temp = {
          ...dateObject,
          type: buttonText ? buttonText : newLabel.replace(/[^a-zA-Z ]/g, ""), // dropdown label
          dattype: newdattype, // text or date or country
          query: Scode, // which goes in
          operatersvalue: operatorsArray[index]
            ? operatorsValidValues.includes(operatorsArray[index].toLowerCase())
              ? operatorsArray[index].toUpperCase()
              : "AND"
            : "AND",
          startdate: "",
          enddate: dateobj,
        };

        editField.push(temp);
      } else if (query.includes(">=")) {
        let temp = {
          ...dateObject,
          type: buttonText ? buttonText : newLabel.replace(/[^a-zA-Z ]/g, ""), // dropdown label
          dattype: newdattype, // text or date or country
          query: Scode, // which goes in
          operatersvalue: operatorsArray[index]
            ? operatorsValidValues.includes(operatorsArray[index].toLowerCase())
              ? operatorsArray[index].toUpperCase()
              : "AND"
            : "AND",
          startdate: dateobj,
          enddate: "",
        };

        editField.push(temp);
      }
    } else if (newdattype === "dropdown") {
      let dropdownType = buttonText
        ? buttonText
        : newLabel.replace(/[^a-zA-Z\_ ]/g, "");
      if (dropdownType === "ALD") {
        stateObj = {
          id: uuidv4(),
          name: "State",
          code: "state",
          type: "dropdown",
          query: dropdownType,
          filedsinput: stateValues.includes(newQuery.toLowerCase())
            ? newQuery
            : "",
          operatersvalue: "AND",
        };
      } else if (dropdownType === "LST") {
        statusObj = {
          id: uuidv4(),
          name: "Status",
          code: "status",
          type: "dropdown",
          query: dropdownType,
          filedsinput: statusValues.includes(newQuery.toLowerCase())
            ? newQuery
            : "",
          operatersvalue: "AND",
        };
      } else if (dropdownType === "PTS") {
        typeObj = {
          id: uuidv4(),
          name: "Type",
          code: "type",
          type: "dropdown",
          query: dropdownType,
          filedsinput: typeValues.includes(newQuery.toLowerCase())
            ? newQuery
            : "",
          operatersvalue: "AND",
        };
      } else if (dropdownType === "PT") {
        pubObj = {
          id: uuidv4(),
          name: "Pub",
          code: "pub",
          type: "dropdown",
          query: dropdownType,
          filedsinput: pubValues.includes(newQuery.toLowerCase())
            ? newQuery
            : "",
          operatersvalue: "AND",
        };
      }
    } else {
      if (newdattype === "Text") {
      } else if (newdattype === "Country") {
        countryCount++;
      }

      let temp = {
        id: uuidv4(),
        lang: "eng",
        type: buttonText ? buttonText : newLabel.replace(/[^a-zA-Z\_ ]/g, ""),
        dattype: newdattype,
        query: Scode,
        error: "",
        operatersvalue: operatorsArray[index]
          ? operatorsValidValues.includes(operatorsArray[index].toLowerCase())
            ? operatorsArray[index].toUpperCase()
            : "AND"
          : "AND",
        placeholder: buttonText
          ? dropdownFieldsPlaceholders[buttonText]
            ? dropdownFieldsPlaceholders[buttonText]
            : "Enter Text Here"
          : "Enter Text Here",
        filedsinput: newQuery,
        textLabel: "newLabel",
      };

      editField.push(temp);
    }
  });

  if (dateCount === 0) {
    editField.push({
      ...dateObject,
      type: "Date",
      dattype: "Date",
      startdate: "",
      enddate: "",
      query: "",
      fielderror: "",
      dateerror: "",
      operatersvalue: "AND",
    });
  }
  if (countryCount === 0) {
    editField.push({
      id: uuidv4(),
      lang: "eng",
      type: "Country",
      dattype: "Country",
      filedsinput: "",
      query: "",
      error: "",
      countryerror: "",
      speacialcharacter: "",
      operatersvalue: "AND",
      fileds: [
        {
          valuecode: "Country",
        },
        { valuecode: "Text" },
        { valuecode: "Assignee" },
        { valuecode: "Inventor" },
        { valuecode: "Date" },
        { valuecode: "Country" },
      ],
    });
  }

  return [
    ...[stateObj, statusObj, typeObj, pubObj],
    ...editField,
    ...getRemainingTextFields(textFieldsList, editField, fieldData),
  ];
};
