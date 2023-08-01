/* eslint-disable no-useless-concat */
import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import RWireButton from "../../components/rwire-ui/rwire-button/rwire-button";
import RWIRE_IMAGES from "../../components/common/common-functions/rwire-images";
import { useNavigate } from "react-router-dom";
import FieldsSearchTable from "./fields-table";
import { Trans, useTranslation } from "react-i18next";
import { addHistory, getQueryCount } from "../../action/history";
import ContentEditable from "../../components/common/content-editable";
import RwireFooterButtons from "../../container/rwire-footer-buttons";

function RWireExpert(props) {
  const {
    onUpdateQueryCount,
    onRwireSearchAPI,
    onSetApp,
    onFetchHistory,
    validationQuery,
    syntaxqueryError,
    syntaxqueryCorrect,
    editQueryId = "",
    editQuery = "",
    clickOnEditQuery,
    searchedTab,
    activeTab,
    searchQuery,
    queryFields: fieldData = [],
    onSetAllField,
    isNumberSearchHistory,
    tabWiseSearchQuery: { expert: expertQuery },
    tabWiseSearchQuery,
    currentPage,
    onSetQuery
  } = props;

  const navigate = useNavigate();

  useEffect(() => {
    if (currentPage === "history") {
      if (isNumberSearchHistory) {
        setQuery("");
        return;
      } else if (
        editQuery &&
        (editQuery.includes("SS") ||
          (editQuery.includes(">") && !editQuery.includes(">=")) ||
          (editQuery.includes("<") && !editQuery.includes("<=")))
      ) {
        setTimeout(() => {
          setQuery(editQuery);
        }, 10);
      } else {
        setQuery("");
        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickOnEditQuery]);

  const { t } = useTranslation();

  const handleChange = (value) => {
    setQuery(value);
    if (!value) {
      onSetApp({ searchQuery: "" });
      onSetQuery({ syntaxqueryCorrect: "", syntaxqueryError: "" });
    }
  };

  const handleSearch = () => {
    if (expertQuery) {
      onSetApp({ searchQuery: expertQuery, searchedTab: "expert" });
      onRwireSearchAPI(expertQuery).then((data) => {
        if (data) {
          navigate("/en/rwire-patents");
          const clearData = fieldData.map((item) => {
            return {
              ...item,
              filedsinput: "",
              startdate: "",
              enddate: "",
              operatersvalue: "",
            };
          });

          onSetAllField({ queryFields: clearData });
        } else {
          // eslint-disable-next-line no-console
          console.log(props.error);
        }
      });
    }
  };

  const handleClear = () => {
    window.location.reload(false);
  };

  const handleClick = () => {
    handleSearch();
  };

  const queryValidation = () => {
    validationQuery(expertQuery);
  };

  const handleSave = async () => {
    try {
      onUpdateQueryCount(editQueryId, expertQuery);
      await onSetApp({ queryEvaluatorText: expertQuery });
      setTimeout(async () => {
        await onFetchHistory();
      }, 1000);
    } catch (error) {
      onSetApp({ syntaxqueryError: "Please check operators" });
    }
  };

  const handleSaveAsNew = async () => {
    const resultTotal = await getQueryCount(expertQuery);
    await addHistory({
      query: expertQuery,
      numberOfHits: resultTotal.count,
    });
    await onSetApp({
      queryEvaluatorText: expertQuery,
      queryEvaluatorExpertSearchError: "",
    });
    setTimeout(async () => {
      await onFetchHistory();
    }, 1000);
  };

  const setQuery = (value) => {
    onSetAllField({
      tabWiseSearchQuery: { ...tabWiseSearchQuery, expert: value },
    });
  };

  const isActiveTab = searchedTab === "expert" && activeTab === "expert";

  return (
    <>
      <Trans>
        <div className="main-expert-design">
          <div className="table-box">
            <div className="text-wrapper">
              <div className="query-text field-text d-flex">
                <span>{t("short-code-label")}</span>
              </div>
              <div
                className={`${
                  document.title.includes("History")
                    ? "history-expert-page-design"
                    : ""
                } expert-page-design `}>
                <FieldsSearchTable {...props} />
              </div>
            </div>
          </div>
          <div className="ml-3 query-box-expert text-left">
            <div className="query-text">
              <span className="query-text">{t("rwire_query")}</span>
            </div>
            <div className="expert-contenteditable">
              <ContentEditable
                value={
                  expertQuery ? expertQuery : isActiveTab ? searchQuery : ""
                }
                height={document.title.includes("History") ? "267px" : "500px"}
                onChange={handleChange}
              />
            </div>
            {expertQuery ? (
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
                        expertQuery ? "" : "text-syntax-opcaity"
                      } save-as-new-btn`}
                      onClick={handleSaveAsNew}>
                      Save as new
                    </button>
                  </div>

                  <div className="clearall search-query">
                    <button
                      className={`clear-all input-button-text-form ${
                        expertQuery ? "" : "text-syntax-opcaity"
                      }`}
                      onClick={handleSave}>
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <div className="clearall search-query">
                  <button
                    className={`clear-all input-button-text-form ${
                      expertQuery ? "" : "text-syntax-opcaity"
                    }`}
                    onClick={handleClear}>
                    Clear All
                  </button>
                </div>
              )}
              {expertQuery ? (
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
        </div>
        <RwireFooterButtons />
      </Trans>
    </>
  );
}
export default RWireExpert;
