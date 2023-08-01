/* eslint-disable no-useless-escape */
/* eslint-disable no-useless-concat */
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import RWireButton from "../../components/rwire-ui/rwire-button/rwire-button";
import RWIRE_IMAGES from "../../components/common/common-functions/rwire-images";
import { useNavigate } from "react-router-dom";
import ContentEditable from "../../components/common/content-editable";
import NumberSection from "./number-section";
import { Trans, useTranslation } from "react-i18next";
import {
  addHistory,
  getQueryCount,
  getQueryinsideBrackets,
} from "../../action/history";
import "../../assets/css/number-search.scss";
import {
  getCheckFields,
  getFinalSearchString,
  getShortCode,
} from "../../common/number-search";
import { clearFielded } from "../../common/clear-filded";
import { removeSpaceFieldOperators } from "../../common/pre-process-input/utils";

function RWireNumber(props) {
  const {
    queryFields: fieldData = [],
    onRwireSearchAPI,
    onSetApp,
    validationQuery,
    syntaxqueryError,
    syntaxqueryCorrect,
    editQuery = "",
    editQueryId = "",
    onUpdateQueryCount,
    onFetchHistory,
    clickOnEditQuery,
    onSetNumber,
    selectedFieldes,
    onSetAllField,
    searchedTab,
    activeTab,
    searchQuery,
    fileName,
    isNumberSearch,
    isNumberSearchHistory,
    tabWiseSearchQuery,
    tabWiseSearchQuery: { number: numberQuery },
    currentPage = "home",
    selectedNumberFilter,
    onSetQuery,
  } = props;
  const [sCode, setSCode] = useState("");
  const [checkboxError, setCheckboxError] = useState("");
  const isActiveTab = searchedTab === "number" && activeTab === "number";
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (isNumberSearch) {
      onSetNumber({ fileName: "" });
    }
  }, [isNumberSearch, onSetNumber]);

  useEffect(() => {
    if (currentPage === "history") {
      if (isNumberSearchHistory) {
        setTimeout(() => {
          const value =
            editQuery &&
            (editQuery.includes("(")
              ? editQuery.match(/\(([^)]+)\)/)[1]
              : editQuery);
          setQuery(value);
          setSCode("");
        }, 10);
        if (editQuery) {
          let editCheckFields = editQuery.match(/([^=]+)(?=\>\=|\<\=|\=)/)
            ? editQuery.match(/([^=]+)(?=\>\=|\<\=|\=)/)[1]
            : null;
          onSetNumber({ selectedFieldes: getCheckFields(editCheckFields) });
        }
      } else if (
        editQuery &&
        (editQuery.includes("SS") ||
          (editQuery.includes(">") && !editQuery.includes(">=")) ||
          (editQuery.includes("<") && !editQuery.includes("<=")))
      ) {
        onSetNumber({ selectedFieldes: ["PN"] });
        setQuery("");
        return;
      } else {
        onSetNumber({ selectedFieldes: ["PN"] });
        setQuery("");
        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickOnEditQuery]);

  const handleChange = (value) => {
    if (!value) {
      onSetApp({ searchQuery: "" });
      onSetQuery({ syntaxqueryCorrect: "", syntaxqueryError: "" });
    }
    if (numberQuery !== value && !isNumberSearch) {
      onSetNumber({ isNumberSearch: true });
    }
    setQuery(value);
  };

  const handleSearch = () => {
    if (selectedFieldes.length > 0) {
      setCheckboxError("");
      if (numberQuery) {
        let searchString = queryValidation();
        onSetApp({ searchQuery: searchString, searchedTab: "number" });
        searchString = getFinalSearchString(searchString).join(" OR ");
        onRwireSearchAPI(searchString, {
          isNumberWithIncludeSearch: true,
        }).then((data) => {
          if (data) {
            navigate("/en/rwire-patents");
            const clearData = clearFielded(fieldData);
            onSetAllField({ queryFields: clearData });
          }
        });
      }
    } else {
      setCheckboxError("Please select atleast one type");
    }
  };

  const handleClear = () => {
    window.location.reload(false);
  };

  const queryValidation = () => {
    let tempNumberQuery = removeSpaceFieldOperators(numberQuery);
    if (selectedFieldes.length > 0) {
      setCheckboxError("");
      let temp = "";
      if (sCode === "") {
        let oldScode = "";
        let tempSCode = getShortCode(selectedFieldes);
        if (tempNumberQuery.includes("=")) {
          oldScode = tempNumberQuery.match(/([^=]+)/)[1];
          let newQuery = tempNumberQuery.replaceAll(oldScode, tempSCode);
          temp = newQuery
            .replaceAll(/\n+|,+|;|\|/g, ",")
            .replaceAll(/,+/g, ",");
          temp = temp
            .split(",")
            .filter((i) => i)
            .join(",");
          setQuery(temp);
        } else {
          setSCode(tempSCode);
          temp = tempNumberQuery
            .replaceAll(/\n+|,+|;|\|/g, ",")
            .replaceAll(/,+/g, ",");
          temp = temp
            .split(",")
            .filter((i) => i)
            .join(",");
          temp = tempSCode + "=(" + temp.replaceAll(",", " OR ") + ")";
          setQuery(temp);
        }
      } else {
        let tempSCode = getShortCode(selectedFieldes);
        setSCode(tempSCode);
        temp = tempNumberQuery
          .replaceAll(/\n+|,+|;|\|/g, ",")
          .replaceAll(/,+/g, ",");
        temp = temp
          .split(",")
          .filter((i) => i)
          .join(",");
        if (temp.includes("(")) {
          temp = getQueryinsideBrackets(temp);
        }
        temp = tempSCode + "=(" + temp.replaceAll(",", " OR ") + ")";
        setQuery(temp);
      }
      const tempQuery = getFinalSearchString(temp).join(" OR ");
      validationQuery(tempQuery);
      return temp;
    } else {
      setCheckboxError("Please select atleast one type");
    }
  };

  const handleSave = async () => {
    if (selectedFieldes.length > 0) {
      setCheckboxError("");
      try {
        let searchString = queryValidation();
        onUpdateQueryCount(editQueryId, searchString);
        onSetApp({ searchQuery: searchString, searchedTab: "number" });
        searchString = getFinalSearchString(searchString).join(" OR ");

        await onSetApp({ queryEvaluatorText: searchString });
        setTimeout(async () => {
          await onFetchHistory();
        }, 1000);
      } catch (error) {
        onSetApp({ syntaxqueryError: "Please check operators" });
      }
    } else {
      setCheckboxError("Please select atleast one type");
    }
  };

  const handleSaveAsNew = async () => {
    if (selectedFieldes.length > 0) {
      setCheckboxError("");
      let searchString = queryValidation();
      let searchTempString = searchString;
      onSetApp({ searchQuery: searchString, searchedTab: "number" });
      const resultTotal = await getQueryCount(searchString);
      await addHistory({
        query: searchTempString,
        numberOfHits: resultTotal.count,
      });

      await onSetApp({
        queryEvaluatorText: searchString,
        queryEvaluatorExpertSearchError: "",
      });

      setTimeout(async () => {
        await onFetchHistory();
      }, 1000);
    } else {
      setCheckboxError("Please select atleast one type");
    }
  };

  const setQuery = (value) => {
    onSetAllField({
      tabWiseSearchQuery: { ...tabWiseSearchQuery, number: value },
    });
  };

  return (
    <Trans>
      <div className="main-number-design">
        <div className="text-center">
          <div className="d-flex">
            <div className="text_wrapper_number">
              <div className="query-text field-text d-flex">
                <span className="shortcode">{t("number-search")}</span>
              </div>
              <div className={` number-page-design `}>
                <NumberSection
                  onSetApp={onSetApp}
                  selectedFieldes={selectedFieldes}
                  onSetNumber={onSetNumber}
                  fileName={fileName}
                  onSetQuery={setQuery}
                  selectedNumberFilter={selectedNumberFilter}
                  setCheckboxError={setCheckboxError}
                  checkboxError={checkboxError}
                />
              </div>
            </div>
            <div className="ml-3 query-box-expert text-left">
              <div className="query-text">
                <span className="query-text">{t("rwire_query")}</span>
              </div>
              <div className="scroll-x my-custom-scrollbar h-100 content-wrap">
                <ContentEditable
                  value={
                    numberQuery ? numberQuery : isActiveTab ? searchQuery : ""
                  }
                  onChange={handleChange}
                />
                {numberQuery ? (
                  <div className="text-area-syntax">
                    {syntaxqueryCorrect ? (
                      <div style={{ color: "green" }}>{syntaxqueryCorrect}</div>
                    ) : (
                      <div style={{ color: "#f00" }}>{syntaxqueryError}</div>
                    )}
                    <div className="syntax-check" onClick={queryValidation}>
                      Check Syntax
                      <input type="checkbox" checked />
                    </div>
                  </div>
                ) : (
                  <div className="text-area-syntax text-area-syntax-opcaity">
                    {syntaxqueryCorrect ? (
                      <div style={{ color: "green" }}>{syntaxqueryCorrect}</div>
                    ) : (
                      <div style={{ color: "#f00" }}>{syntaxqueryError}</div>
                    )}
                    <div className="syntax-check">
                      Check Syntax
                      <input type="checkbox" checked disabled />
                    </div>
                  </div>
                )}
                <div className="text-area">
                  {document.title === "Researchwire | History" ? (
                    <>
                      <div className="clearall search-query">
                        <button
                          className={`clear-all input-button-text-form ${
                            numberQuery ? "" : "text-syntax-opcaity"
                          } save-as-new-btn`}
                          onClick={handleSaveAsNew}
                        >
                          Save as new
                        </button>
                      </div>

                      <div className="clearall search-query">
                        <button
                          className={`clear-all input-button-text-form ${
                            numberQuery ? "" : "text-syntax-opcaity"
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
                          numberQuery ? "" : "text-syntax-opcaity"
                        }`}
                        onClick={handleClear}
                      >
                        Clear All
                      </button>
                    </div>
                  )}
                  {numberQuery ? (
                    <RWireButton
                      cNameDiv="search-query"
                      buttonCName="input-button-text-form"
                      name="Search"
                      buttonImg={RWIRE_IMAGES.RwireSearchBlackIcon}
                      onClick={handleSearch}
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
            </div>
          </div>
        </div>
      </div>
    </Trans>
  );
}

export default RWireNumber;
