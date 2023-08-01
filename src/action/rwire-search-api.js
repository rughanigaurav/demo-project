import peggy from "../resources/parser/parser";
import { generateQuery } from "../common/generate-rec-query";
import { setQuery } from "./search-query";
import { checkSpecialConditions, cleanQuery } from "../common/query-functions";
import { addHistory, reRunHistory } from "../action/history";
import { getSelectedFilters } from "./aggregationFunction";
import { setSelectedField } from "./export";
import { filtersJson } from "../components/common/patents-result-common/rwire-filter-modal";
import { setApp } from "./app";
import { smart_search, filters_options } from "../components/constant";
import { displayError } from "../service/display-error";
import { search } from "../service/elasticSearch";
import { Highlightmap } from "../common/qv-heading-map";
import { formatNumberFields } from "../common/pre-process-input/utils";
import { replaceSpace } from "../common/query-replace-space";

const filterFields = [
  "ALD",
  "LST",
  "PTS",
  "PT",
  "PNC",
  "AC",
  "PRC",
  "PCTPC",
  "DSEP",
  "DSEP_CST",
  "DSEP_EST",
  "DSEP_VST",
  "DSEP_PST",
  "DSPCT",
  "DSPCT_RGCN",
  "DSPCT_AOST",
  "DSPCT_RGNCN",
  "DSPCT_NT",
  "DSPCT_NDSCN",
];

const gethighlightedQueryWordsArray = (queryObj, blankArray) => {
  return new Promise((resolve, reject) => {
    if (!filterFields.includes(queryObj.field)) {
      if (queryObj.term) {
        blankArray.push(queryObj.term);
      }
      if (queryObj.left) {
        gethighlightedQueryWordsArray(queryObj.left, blankArray);
      }
      if (queryObj.right) {
        gethighlightedQueryWordsArray(queryObj.right, blankArray);
      }
    }
    resolve();
  });
};

export const setResultTable = (payload) => ({
  type: "RESULT_SET",
  payload: {
    ...payload,
  },
});

export const resetHighlightWords = (payload) => ({
  type: "RESULT_SET",
  payload: {
    ...payload,
  },
});

export const resetDetails = (payload = []) => ({
  type: "RESET_RESULT_SET",
  payload,
});
export const resetState = (payload) => ({
  type: "RESET_STATE_EXCLUDING_PAYLOAD",
  payload,
});
export const rwireSearchAPI =
  (queryToSearch = "", options = {}) =>
  async (dispatch, getState) => {
    const { isNumberWithIncludeSearch = false } = options;
    let { isReRunId } = options;
    const {
      app: { searchQuery },
      resultTable: { isLoadingResult },
    } = getState();
    let success = true;
    if (!isLoadingResult) {
      if (queryToSearch !== "") {
        dispatch(setSelectedField({ selectedFields: ["PN_B"] }));
        dispatch(
          resetDetails([
            "filterList",
            "patentReamainingList",
            "patentInformationList",
            "dataSize",
          ])
        );
        dispatch(resetHighlightWords({ highlightword: [] }));
        localStorage.removeItem("highlightWords");
      }

      dispatch(setResultTable({ isLoadingResult: true }));
      const {
        resultTable: {
          dataSize,
          dataFrom,
          sortBy,
          sortType,
          includeFieldsOnResult,
        },
        app: { collapsebleFields = "PN_B", selectedIncludes = [] },
      } = getState();
      const finalSearchQuery = queryToSearch ? queryToSearch : searchQuery;
      const isValidQuery = await dispatch(validationQuery(finalSearchQuery));
      if (!isValidQuery) {
        dispatch(setResultTable({ isLoadingResult: false }));
        return isValidQuery;
      }

      await dispatch(setQuery({ syntaxqueryCorrect: "" }));
      let filters = getSelectedFilters(getState().resultTable);

      const queryObj = {
        queryToSearch: finalSearchQuery,
        isNumberWithIncludeSearch,
        selectedIncludes,
        dataSize,
        dataFrom,
        sortBy,
        sortType,
        includeFieldsOnResult,
        collapsebleField: collapsebleFields,
        filters,
        highlightWords: Highlightmap,
        require_field_match: false,
      };
      const storedQueryDetails = {
        queryToSearch: queryObj.queryToSearch,
        isNumberWithIncludeSearch: queryObj.isNumberWithIncludeSearch,
        selectedIncludes: queryObj.selectedIncludes,
        filters: queryObj.filters,
      };
      localStorage.setItem(
        "storedQueryDetails",
        JSON.stringify(storedQueryDetails)
      );
      const body = JSON.stringify(queryObj);
      try {
        const data = await search(body, smart_search);
        const dataResponse = data.data;
        let highlightedQueryWordsArray = [];
        let processedQuery = formatNumberFields(finalSearchQuery, {
          isForHighlightWords: true,
        });
        const parser = peggy.parse(processedQuery);

        await gethighlightedQueryWordsArray(parser, highlightedQueryWordsArray);
        highlightedQueryWordsArray = [...new Set(highlightedQueryWordsArray)];
        isReRunId = isReRunId ? isReRunId : "";
        window.origQuery = finalSearchQuery;
        dispatch(
          setResultDetails({
            dataResponse,
            // dataAggregationResponse,
            isReRunId,
            highlightword: highlightedQueryWordsArray,
          })
        );
        return success;
      } catch (error) {
        displayError(error);
        dispatch(setResultTable({ isLoadingResult: false }));
        dispatch(setResultTable({ error: "Something went wrong" }));
        dispatch(
          setQuery({
            syntaxqueryError:
              error &&
              error.response &&
              error.response.data &&
              error.response.data.message,
          })
        );
        success = false;
      }
      return success;
    }
    dispatch(setResultTable({ isLoadingResult: false }));
  };

export const validationQuery = (rawQuery) => async (dispatch, getState) => {
  try {
    const {
      searchQuery: { tabWiseSearchQuery },
      app: { activeTab },
    } = getState();
    rawQuery = replaceSpace(rawQuery);
    window.origQuery = cleanQuery(rawQuery);

    checkSpecialConditions(rawQuery);
    rawQuery = formatNumberFields(rawQuery);

    const parser = peggy.parse(cleanQuery(rawQuery));
    generateQuery(parser, true);
    dispatch(
      setApp({
        searchQuery: window.origQuery,
        searchedVisibleQuery: window.origQuery,
      })
    );
    dispatch(
      setQuery({
        syntaxqueryError: "",
        tabWiseSearchQuery: {
          ...tabWiseSearchQuery,
          [activeTab]: window.origQuery,
        },
      })
    );
    dispatch(setQuery({ syntaxqueryCorrect: "Syntax correct " }));
    return true;
  } catch (e) {
    let errorMessage = e.message ? e.message : "Syntax Wrong";
    if (
      errorMessage.includes(
        '[aA], [nN], [oO], [sS], or whitespace but ")" found.'
      )
    ) {
      errorMessage = "Please input the value in a field.";
    }
    if (errorMessage.includes('end of input, or whitespace but ")" found.')) {
      errorMessage = "Please check the brackets.";
    }
    if (
      errorMessage.includes("or whitespace but end of input found.") ||
      errorMessage.includes('but "(" found.') ||
      errorMessage.includes('but "}" found.') ||
      errorMessage.includes('but "{" found.') ||
      errorMessage.includes('but "[" found.') ||
      errorMessage.includes('but "]" found.')
    ) {
      errorMessage = "Please check the brackets.";
    }
    if (
      errorMessage.includes('or whitespace but "=" found.') ||
      errorMessage.includes('or whitespace but "<" found.') ||
      errorMessage.includes('but ")" found.') ||
      errorMessage.includes("or [^/] but end of input found.") ||
      errorMessage.includes("or whitespace but") ||
      errorMessage.includes('or whitespace but ">" found.')
    ) {
      errorMessage = "Please input valid special characters.";
    }
    if (errorMessage.includes('Expected "0." or [0-9] but "^" found.')) {
      errorMessage = "Please input valid special characters.";
    }

    dispatch(setQuery({ syntaxqueryCorrect: "" }));
    dispatch(setQuery({ syntaxqueryError: errorMessage }));

    return false;
  }
};

const setResultDetails =
  ({
    dataResponse = [],
    elasticQuery,
    dataAggregationResponse,
    isReRunId,
    highlightword,
  }) =>
  async (dispatch, getState) => {
    const {
      app: { collapsebleFields = "PN_B" },
    } = getState();
    let total = dataResponse.aggregations[collapsebleFields]
      ? dataResponse.aggregations[collapsebleFields].value
      : 0;

    //PLEASE DO NOT REMOVE BELOW COMMENT CODE
    // let applicationCount = dataResponse.aggregations["AN_B"].value;
    // if (dataResponse.hits.total.relation === "gte") {
    //   const resultTotal = await count(JSON.stringify({ query: elasticQuery }));
    //   total = resultTotal.count;
    // }

    const result = dataResponse.hits.hits;

    dispatch(
      setResultTable({
        totalRecordsCount: total,
        displayData: result,
        isLoadingResult: false,
        aggregations: dataResponse.aggregations,
        esHighlightwords: highlightword,
        highlightword,
        totalHighlightedWords: highlightword,
      })
    );

    if (!isReRunId && typeof isReRunId !== "boolean") {
      await addHistory({
        query: window.origQuery,
        numberOfHits: total,
      });
    } else if (typeof isReRunId !== "boolean") {
      await reRunHistory(isReRunId);
    }
  };

export const mapKeysToProps = (filterList) => {
  return filterList.map((key) => filtersJson[key]);
};

export const getFiltersOptions =
  ({ isIndivisual = false, isDisplayListFilters = false }) =>
  async (dispatch, getState) => {
    const {
      resultTable: {
        filtersSearchText,
        openedFilterName = "",
        filterOptionsData,
        filterList,
      },
      app: { searchQuery, collapsebleFields = "PN_B" },
    } = getState();
    const isValidQuery = await dispatch(validationQuery(searchQuery));
    if (!isValidQuery) {
      dispatch(
        setResultTable({
          isLoadingFilterData: false,
        })
      );
      return;
    }

    await dispatch(setQuery({ syntaxqueryCorrect: "" }));
    if (openedFilterName !== "" || isDisplayListFilters) {
      if (
        !filterOptionsData.hasOwnProperty(filtersJson[openedFilterName]) ||
        isIndivisual ||
        isDisplayListFilters
      ) {
        dispatch(
          setResultTable({
            isLoadingFilterData: filterOptionsData.hasOwnProperty(
              filtersJson[openedFilterName]
            )
              ? false
              : true,
          })
        );
        const fields = isDisplayListFilters
          ? mapKeysToProps(filterList)
          : [filtersJson[openedFilterName]];
        const queryFilters = getSelectedFilters(getState().resultTable);
        let queryObj = JSON.parse(localStorage.getItem("storedQueryDetails"));
        queryObj = {
          queryToSearch: searchQuery,
          isNumberWithIncludeSearch: queryObj.isNumberWithIncludeSearch,
          selectedIncludes: queryObj.selectedIncludes,
          fields,
          filtersSearchText,
          collapsebleField: collapsebleFields,
          filters: queryFilters,
        };
        const body = JSON.stringify(queryObj);

        try {
          const dataAggregationResponse = await search(body, filters_options);
          const filterOptions = dataAggregationResponse.data.aggregations;
          if (isIndivisual) {
            dispatch(
              setResultTable({
                filterOptionsData: {
                  ...filterOptionsData,
                  [[filtersJson[openedFilterName]]]:
                    filterOptions[filtersJson[openedFilterName]],
                },
                isLoadingFilterData: false,
              })
            );
          } else {
            dispatch(
              setResultTable({
                filterOptionsData: { ...filterOptionsData, ...filterOptions },
                isLoadingFilterData: false,
              })
            );
          }
        } catch (error) {
          displayError(error);
          dispatch(
            setResultTable({
              isLoadingFilterData: false,
            })
          );
          return false;
        }
      }
    }
  };

export const inputValidationQuery =
  (rawQuery) => async (dispatch, getState) => {
    try {
      const {
        searchQuery: { tabWiseSearchQuery },
        app: { activeTab },
      } = getState();
      window.origQuery = cleanQuery(rawQuery);

      checkSpecialConditions(rawQuery);
      rawQuery = formatNumberFields(rawQuery);
      const parser = peggy.parse(cleanQuery(rawQuery));
      generateQuery(parser, true);

      dispatch(
        setApp({
          searchQuery: window.origQuery,
          searchedVisibleQuery: window.origQuery,
        })
      );
      dispatch(
        setQuery({
          syntaxqueryError: "",
          tabWiseSearchQuery: {
            ...tabWiseSearchQuery,
            [activeTab]: window.origQuery,
          },
        })
      );
      return true;
    } catch (e) {
      return false;
    }
  };
