import React, { useEffect, useState } from "react";
import { useStore } from "react-redux";
import RWireButton from "../rwire-button/rwire-button";
import RWIRE_IMAGES from "../../common/common-functions/rwire-images";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  addHistory,
  getEditFields,
  getQueryCount,
} from "../../../action/history";
import ContentEditable from "../../common/content-editable";
import { clearFielded } from "../../../common/clear-filded";
import { yearFields } from "../../../common/date-validation";
import { resetFields } from "../../../resources/data/options";
import { getChunksData } from "../../../common/getChunksData";

export default function RWireTextarea(props) {
  const {
    fieldData,
    onRwireSearchAPI,
    onSetApp,
    validationQuery,
    syntaxqueryError,
    syntaxqueryCorrect,
    setAllField,
    searchQuery,
    onCloseModal,
    onUpdateQueryCount,
    editQueryId,
    onFetchHistory,
    isUpdateModal = false,
    smartSearchWord,
    isUpdateQuery,
    currentPage,
    tabWiseSearchQuery,
    tabWiseSearchQuery: { fielded },
    isEditModalOpen,
    localQuery,
    setLocalQuery,
    onSetQuery,
    inputValidationQuery,
    previousPage = "rwire-patents",
    fromClasssSuggestor = false,
    onSetClassSuggestor,
  } = props;
  const store = useStore();
  const {
    app: { searchedTab, activeTab },
  } = store.getState();
  const isOpen = isEditModalOpen || fielded;
  const [isBlanckValue, setBlackValue] = useState(isOpen);
  const [isClearAll, setIsClearAll] = useState(false);

  useEffect(() => {
    if (!localQuery && typeof setLocalQuery === "function") {
      setLocalQuery(searchQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const navigate = useNavigate();
  const isActiveTab = searchedTab === "fielded" && activeTab === "fielded";
  let finalValue = "";

  if ((localQuery && isEditModalOpen) || (isClearAll && isEditModalOpen)) {
    finalValue = fielded;
  } else if (fielded) {
    finalValue = fielded;
  } else if (isActiveTab) {
    finalValue = searchQuery;
  }

  const getOperator = (currentItemIndex) => {
    let value = "";
    const prevItem = fieldData[currentItemIndex - 1];
    if (
      prevItem &&
      (prevItem.filedsinput || prevItem.enddate || prevItem.startdate)
    ) {
      value = prevItem.operatersvalue;
      return value;
    } else if (currentItemIndex !== -1) {
      return getOperator(currentItemIndex - 1);
    }
  };

  useEffect(() => {
    if (!smartSearchWord && !isUpdateQuery) {
      let searchQueryFinal = "";
      fieldData.map((item, index) => {
        if (item.filedsinput === undefined) {
          item.filedsinput = "";
        }
        if (
          ((item.filedsinput === "" || item.filedsinput === " ") &&
            !item.startdate &&
            !item.enddate) ||
          !item.type === "dropdown"
        ) {
          // setAllField({ tabWiseSearchQuery: {...tabWiseSearchQuery, fielded: "" } });
        } else {
          if (searchQueryFinal) {
            if (!item.startdate && !item.enddate && item.filedsinput) {
              let operator = getOperator(index);
              if (item.type === "dropdown") {
                operator = "AND";
              }
              searchQueryFinal =
                searchQueryFinal +
                operator +
                " " +
                item.query +
                "=" +
                "(" +
                item.filedsinput +
                ")" +
                " ";
            }
          } else {
            if (
              (!item.startdate &&
                !item.enddate &&
                item.filedsinput &&
                item.filedsinput !== " ") ||
              item.type === "dropdown"
            ) {
              searchQueryFinal = `${item.query}=(${item.filedsinput}) `;
            }
          }
          if (item.startdate) {
            if (item.startdate === "Invalid date") {
              searchQueryFinal = searchQueryFinal + " " + item.query + ">=()";
            } else {
              const operator = getOperator(index);
              const operatorString =
                typeof operator !== "undefined" ? operator : "";
              searchQueryFinal =
                searchQueryFinal +
                operatorString +
                " " +
                item.query +
                ">=(" +
                moment(item.startdate).format(
                  yearFields.includes(item.query) ? "yyyy" : "YYYYMMDD"
                ) +
                ")" +
                " ";
            }
          }
          if (item.enddate) {
            if (item.enddate === "Invalid date") {
              searchQueryFinal =
                searchQueryFinal +
                " " +
                "AND" +
                " " +
                item.query +
                "<=()" +
                " ";
            } else {
              if (item.startdate) {
                searchQueryFinal =
                  searchQueryFinal +
                  " " +
                  "AND" +
                  " " +
                  item.query +
                  "<=(" +
                  moment(item.enddate).format(
                    yearFields.includes(item.query) ? "yyyy" : "YYYYMMDD"
                  ) +
                  ")" +
                  " ";
              } else {
                const operator = getOperator(index);
                const operatorString =
                  typeof operator !== "undefined" ? operator : "";
                searchQueryFinal =
                  searchQueryFinal +
                  operatorString +
                  " " +
                  item.query +
                  "<=(" +
                  moment(item.enddate).format(
                    yearFields.includes(item.query) ? "yyyy" : "YYYYMMDD"
                  ) +
                  ")" +
                  " ";
              }
            }
          }
        }
        return false;
      });
      if (isEditModalOpen) {
        setLocalQuery(searchQueryFinal);
      } else {
        onSetApp({ searchQuery: searchQueryFinal });
        setAllField({
          tabWiseSearchQuery: {
            ...tabWiseSearchQuery,
            fielded: searchQueryFinal,
          },
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldData]);

  const handleSearch = () => {
    if (queryValidation()) {
      if (fielded) {
        onSetApp({ searchQuery: fielded, searchedTab: "fielded" });
        onRwireSearchAPI(fielded).then((data) => {
          if (data) {
            navigate(`/en/${previousPage}`);
            if (isUpdateQuery) {
              const clearData = clearFielded(fieldData);
              setAllField({ queryFields: clearData });
            }
          } else {
            // eslint-disable-next-line no-console
            console.log(props.error);
          }
        });
      }
    }
  };

  const handleClick = async () => {
    if (isUpdateModal) {
      setAllField({
        tabWiseSearchQuery: { ...tabWiseSearchQuery, fielded: localQuery },
      });
      onSetApp({ isSearchFromIncremental: false });
      if (!syntaxqueryError && (await queryValidation())) {
        onCloseModal();
        onRwireSearchAPI(localQuery).then((data) => {
          onSetApp({ searchQuery: localQuery, isSearched: true });
        });
      }
    } else {
      handleSearch();
    }
  };

  const handleClear = () => {
    onSetApp({ smartSearchWord: "", editQuery: "" });
    setIsClearAll(true);
    const clearData = clearFielded(resetFields);
    setAllField({
      queryFields: clearData,
      tabWiseSearchQuery: { fielded: "", expert: "", number: "" },
      syntaxqueryError: "",
      syntaxqueryCorrect: "",
    });

    if (!isEditModalOpen) {
      onSetApp({ searchQuery: "" });
    }
    setLocalQuery("");
  };

  const queryValidation = () => {
    const query = isUpdateModal ? localQuery : fielded;
    return validationQuery(query);
  };
  const handleSave = async () => {
    try {
      onUpdateQueryCount(editQueryId, fielded);
      await onSetApp({ queryEvaluatorText: fielded });
      setTimeout(async () => {
        await onFetchHistory();
      }, 1000);
    } catch (error) {
      onSetApp({ syntaxqueryError: "Please check operators" });
    }
  };

  const handleSaveAsNew = async () => {
    const resultTotal = await getQueryCount(fielded);
    await addHistory({
      query: fielded,
      numberOfHits: resultTotal.count,
    });
    await onSetApp({
      queryEvaluatorText: fielded,
      queryEvaluatorExpertSearchError: "",
    });
    setTimeout(async () => {
      await onFetchHistory();
    }, 1000);
  };
  useEffect(() => {
    handleChange(fielded);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isTypingInTextArea = () => {
    const customInput = document.querySelector(".cm-content");

    if (customInput) {
      return document.activeElement.classList.contains("cm-content");
    }

    return false;
  };
  useEffect(() => {
    getSplitedQuery(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getSplitedQuery = (value) => {
    if (!value.toUpperCase().includes("SS=")) {
      inputValidationQuery(value).then((result) => {
        if (result) {
          let temp = "";
          let { equations, operators, input } = getChunksData(value);
          temp = getEditFields(input, equations, operators, fieldData);

          setAllField({ queryFields: temp });
        }
      });
    } else {
      const clearData = clearFielded(fieldData);
      setAllField({ queryFields: clearData });
    }
  };
  const handleChange = (value) => {
    try {
      if (!value) {
        const clearData = clearFielded(fieldData);
        setAllField({ queryFields: clearData });
        if (!isUpdateModal) {
          onSetQuery({ syntaxqueryCorrect: "", syntaxqueryError: "" });
          setBlackValue(false);
        }
        return "";
      }

      if (isTypingInTextArea() || fromClasssSuggestor) {
        getSplitedQuery(value);
        onSetClassSuggestor({ fromClasssSuggestor: false });
      }
      if (!isUpdateQuery && finalValue !== value) {
        onSetApp({ isUpdateQuery: true });
      }
      if (isEditModalOpen) {
        setLocalQuery(value);
      } else {
        setAllField({
          tabWiseSearchQuery: { ...tabWiseSearchQuery, fielded: value },
        });
        setBlackValue(true);
      }
    } catch (e) {
      return;
    }
  };

  return (
    <div>
      <ContentEditable
        height={currentPage === "history" ? "267px" : "500px"}
        value={finalValue}
        onChange={handleChange}
      />
      <div className="text-area-syntax">
        {syntaxqueryCorrect && isBlanckValue ? (
          <div style={{ color: "green" }}>{syntaxqueryCorrect}</div>
        ) : isBlanckValue ? (
          <div style={{ color: "#f00" }}>{syntaxqueryError}</div>
        ) : (
          ""
        )}
        {isBlanckValue ? (
          <div className="syntax-check" onClick={queryValidation}>
            Check Syntax
            <input type="checkbox" checked onChange={queryValidation} />
          </div>
        ) : (
          <div className="syntax-check syntax-check-opacity">
            Check Syntax
            <input type="checkbox" checked onChange={queryValidation} />
          </div>
        )}
      </div>
      <div className="text-area">
        {currentPage === "history" ? (
          <>
            <div className="clearall search-query">
              <button
                className={`clear-all input-button-text-form ${
                  isBlanckValue ? "" : "text-syntax-opcaity"
                } save-as-new-btn`}
                onClick={handleSaveAsNew}
              >
                Save as new
              </button>
            </div>

            <div className="clearall search-query">
              <button
                className={`clear-all input-button-text-form ${
                  isBlanckValue ? "" : "text-syntax-opcaity"
                }`}
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <div className="clearall search-query">
            <button
              className={`clear-all input-button-text-form ${
                isBlanckValue ? "" : "text-syntax-opcaity"
              }`}
              onClick={handleClear}
            >
              Clear All
            </button>
          </div>
        )}
        {isBlanckValue ? (
          <RWireButton
            cNameDiv="search-query"
            buttonCName="input-button-text-form"
            name="Search"
            buttonImg={RWIRE_IMAGES.RwireSearchBlackIcon}
            onClick={handleClick}
          />
        ) : (
          <RWireButton
            cNameDiv="search-query text-syntax-opcaity"
            buttonCName="input-button-text-form"
            name="Search"
            buttonImg={RWIRE_IMAGES.RwireSearchBlackIcon}
          />
        )}
      </div>
    </div>
  );
}
