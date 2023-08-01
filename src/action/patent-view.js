import { fieldsListForSorting } from "../resources/data/sorting-fields-list";
import { search } from "../service/elasticSearch";
import { classes_suggestor } from "../components/constant";
import { displayError } from "../service/display-error";
import { fetch } from "../service/fetch";

export const setFullView = (payload) => ({
  type: "FULL_VIEW_SET",
  payload: {
    ...payload,
  },
});

export const getPriorityArray = (shortcode) => {
  const languageCodes = ["EN", "FR", "ES", "DE", "CN", "JP", "KR"];
  const startIndex = languageCodes.indexOf(shortcode);

  const reorderedArray = [
    ...languageCodes.slice(startIndex),
    ...languageCodes.slice(0, startIndex),
  ];
  return reorderedArray;
};
export const getLocalizedValue = (data, languageSelected = "EN", shortcode) => {
  if (data) {
    let languagePriority = getPriorityArray(languageSelected);
    let value;
    let languageCode = "";
    for (let i = 0; i < languagePriority.length; i++) {
      languageCode = languagePriority[i];
      value = data[`${shortcode}_${languageCode}`];

      if (value) {
        if (typeof value !== "undefined" && value.length >= 1) {
          return value;
        }
      }
    }
    return "";
  } else return "";
};
export const getFormatizedValue = (data, shortcode) => {
  if (data) {
    const formatCodes = ["B", "O", "D", "DA", "EPO", "T", "L"];
    let value;
    for (let i = 0; i < formatCodes.length; i++) {
      let formatCode = formatCodes[i];
      value = data[`${shortcode}_${formatCode}`];

      if (value) {
        if (typeof value !== "undefined" && value.length >= 1) {
          return value;
        }
      }
    }
    return "";
  } else return "";
};

export const getMax = (arr) => {
  if (!arr) {
    return null;
  }
  var minV = arr[0];
  var maxV = arr[0];
  for (let a of arr) {
    if (a < minV) minV = a;
    if (a > maxV) maxV = a;
  }
  return maxV;
};

export const removeTagNames = (str = "") => {
  return str
    .replaceAll("&amp;", "&")
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<");
};

export const transformedString = (text) => {
  const str = text.match(
    /(<claim-text[^>]*>\s*)\d+[^a-zA-Z0-9\s]*\s*(.*?)(\s*<\/claim-text>)/gi,
    "$1$2$3"
  )
    ? text.replace(
        /(<claim-text[^>]*>\s*)\d+[^a-zA-Z0-9\s]*\s*(.*?)(\s*<\/claim-text>)/gi,
        "$1$2$3"
      )
    : text;
  const result = str.replace(/(<claim-text>)?<b>\d+<\/b>\. /gm, "$1")
    ? str.replace(/(<claim-text>)?<b>\d+<\/b>\. /gm, "$1")
    : str;
  return result;
};

export const getSortedArray = (array = [], fieldName = "", field = "") => {
  if (fieldsListForSorting.includes(field)) {
    array.sort((a, b) => a[fieldName] - b[fieldName]);
    return array;
  } else return array;
};

export const removeHighlightTags = (text) => {
  const regex = /<span class="highlight-word"[\s\S]*?>([\s\S]*?)<\/span>/gi;
  return text.replace(regex, "$1");
};
const setResultTableClasess = (payload) => ({
  type: "RESULT_SET",
  payload: {
    ...payload,
  },
});

export const searchForClassAndKeyword =
  (classes, classesType) => async (dispatch, getState) => {
    const queryObj = {
      classesAndkeywords: { classes: classes.join(",") },
      classesType,
      dataFrom: 0,
      dataSize: 100,
    };

    const {
      resultTable: {
        classesTableData: { ipc, cpc, us },
      },
    } = getState();

    const body = JSON.stringify(queryObj);
    try {
      const data = await search(body, classes_suggestor);
      const dataResponse = data.data;
      const tableData = dataResponse.hits.hits;

      if (classesType === "ipc") {
        dispatch(
          setResultTableClasess({
            classesTableData: { us, cpc, ipc: tableData },
          })
        );
      } else if (classesType === "cpc") {
        dispatch(
          setResultTableClasess({
            classesTableData: { us, cpc: tableData, ipc },
          })
        );
      } else if (classesType === "us") {
        dispatch(
          setResultTableClasess({
            classesTableData: { us: tableData, cpc, ipc },
          })
        );
      }
    } catch (error) {
      displayError(error);
    }
  };

export const removeHighlightByUid = (data, uid, field) => {
  const updatedData = { ...data };
  if (updatedData.hasOwnProperty(field)) {
    updatedData[field] = updatedData[field].filter(
      (highlight) => highlight.Uid !== uid
    );

    if (updatedData[field].length === 0) {
      delete updatedData[field];
    }
  }
  return updatedData;
};
export const updateDataById = (data, id, field, newComment) => {
  const updatedData = { ...data };

  if (updatedData.hasOwnProperty(field)) {
    updatedData[field] = updatedData[field].map((item) => {
      if (item.Uid === id) {
        item.commentText = newComment;
      }
      return item;
    });
  }

  return updatedData;
};
export const applyMultipleHighlights = (inputText = "", ranges = []) => {
  // console.log(ranges);
  if (ranges && ranges.length === 0) return inputText;
  const container = document.createElement("div");
  container.innerHTML = inputText;
  ranges.length > 0 && ranges.sort((a, b) => b.start - a.start);

  const textNodes = getTextNode(container);

  for (const range of ranges) {
    const { start, end, highlightColor, commentText, Uid } = range;

    let currentIndex = 0;

    for (const node of textNodes) {
      const nodeLength = node.textContent.length;
      const nodeStartIndex = currentIndex;
      const nodeEndIndex = currentIndex + nodeLength;

      if (start < nodeEndIndex && end > nodeStartIndex) {
        const rangeStart = Math.max(start - nodeStartIndex, 0);
        const rangeEnd = Math.min(end + 1 - nodeStartIndex, nodeLength);

        const range = document.createRange();
        range.setStart(node, rangeStart);
        range.setEnd(node, rangeEnd);

        const highlightElement = document.createElement("span");
        if (commentText) {
          highlightElement.classList.add("commented-keywords");
          highlightElement.setAttribute("title", `${commentText}`);
        } else {
          highlightElement.classList.add("highlight-keywords");
          highlightElement.classList.add("manual-highlight");
        }
        highlightElement.classList.add("annoted-text");
        highlightElement.style.backgroundColor = highlightColor;
        highlightElement.style.color = "#000";
        highlightElement.id = Uid;

        range.surroundContents(highlightElement);
      }

      currentIndex += nodeLength;
    }
  }
  // console.log(container.innerHTML);
  return container.innerHTML;
};

const getTextNode = (element) => {
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  const textNodes = [];
  let node;

  while ((node = walker.nextNode())) {
    textNodes.push(node);
  }

  return textNodes;
};
export const getUniqueNFValues = (arr) => {
  const uniqueValues = [];

  arr.forEach((obj) => {
    const nfValue = obj.NF;

    // Check if the nfValue matches the pattern "XX YYYYMMDD"
    const match = nfValue.match(/^[A-Z]{2}\s\d{8}$/);

    if (match && !uniqueValues.includes(nfValue)) {
      uniqueValues.push(nfValue);
    }
  });

  return uniqueValues;
};
export const getMergedObj = (
  previousObj,
  fieldName,
  selectionIndex,
  comment,
  Uid,
  color
) => {
  const newObj = {
    [fieldName]: [
      ...(previousObj?.[fieldName] || []),
      {
        ...selectionIndex,
        highlightColor: color,
        commentText: comment,
        Uid: Uid,
      },
    ],
  };
  const mergedObj = {
    ...previousObj,
    ...newObj,
  };
  return mergedObj;
};
function groupObjectsByBody(data) {
  const groupedData = {};

  data.forEach((item) => {
    const { body } = item;
    const parsedBody = JSON.parse(body);

    for (const key in parsedBody) {
      if (!groupedData[key]) {
        groupedData[key] = [];
      }
      groupedData[key] = groupedData[key].concat(parsedBody[key]);
    }
  });
  return groupedData;
}

export const getUserAnnotations = (body) => async (dispatch) => {
  let response;
  try {
    response = await fetch(
      {
        url: `/api/text-annotate/get`,
        body,
      },
      "POST"
    );
    if (response.length > 0) {
      const highlightObj =
        response.find((item) => item.type === "highlight") || null;
      const commentObj =
        response.find((item) => item.type === "comment") || null;

      dispatch(
        setFullView({
          userAnnotations: groupObjectsByBody(response) || [],
          stringsHighlights: highlightObj ? JSON.parse(highlightObj.body) : [],
          stringsComments: commentObj ? JSON.parse(commentObj.body) : [],
        })
      );
    } else {
      dispatch(
        setFullView({
          userAnnotations: [],
          stringsHighlights: [],
          stringsComments: [],
        })
      );
    }
  } catch (error) {
    dispatch(
      setFullView({
        userAnnotations: [],
        stringsHighlights: [],
        stringsComments: [],
      })
    );
  }
};
export const updateUserAnnotations = (body) => async (dispatch) => {
  try {
    await fetch(
      {
        url: `/api/text-annotate`,
        body,
      },
      "POST"
    );
  } catch (error) {}
};
