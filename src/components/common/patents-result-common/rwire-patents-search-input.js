import React, { useState, useEffect } from "react";
import ContentEditable from "../content-editable";
import RWireButton from "../../rwire-ui/rwire-button/rwire-button";
import RWIRE_IMAGES from "../common-functions/rwire-images";
import { useStore } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import "../../../assets/css/search-result-page.scss";
import "../../../../src/pages/rwire-search-result/style.scss";
import { clearFielded } from "../../../common/clear-filded";

const RWirePatentsSearch = (props) => {
  const {
    onRwireSearchAPI,
    validationQuery,
    syntaxqueryError,
    syntaxqueryCorrect,
    onSetApp,
    isIncremental,
    onOpenModal,
    displayQueryIncremental = [],
    onSetIncrementalPart,
    queryFields: fieldData = [],
    onSetAllField,
    searchedTab,
    tabWiseSearchQuery,
    isQuickView = false,
    previousPage = "rwire-patents",
  } = props;

  const store = useStore();
  const [Query, setQuery] = useState("");
  const navigate = useNavigate();
  const {
    app: { searchedVisibleQuery },
  } = store.getState();

  useEffect(() => {
    setQuery(searchedVisibleQuery);
  }, [searchedVisibleQuery]);

  const handleChange = (value) => {
    let str = value;
    str = str.replace(/(<([^>]+)>)/gi, "");
    setQuery(str);
    onSetApp({ isUpdateQuery: true });
  };

  const handleSearch = () => {
    if (Query) {
      let newQuery =
        isIncremental && value !== "()" ? `(${Query}) NOT ${value}` : Query;
      onSetApp({
        searchQuery: newQuery,
        isSearchFromIncremental: isIncremental,
        searchedVisibleQuery: newQuery,
      });
      onSetIncrementalPart(false);
      onRwireSearchAPI(newQuery).then((data) => {
        if (data) {
          navigate(`/en/${previousPage}`);
          const clearData = clearFielded(fieldData);
          onSetAllField({
            queryFields: clearData,
            tabWiseSearchQuery: {
              ...tabWiseSearchQuery,
              [searchedTab]: newQuery,
            },
          });
        } else {
          // eslint-disable-next-line no-console
          console.log(props.error);
        }
      });
    }
  };

  const handleClick = () => {
    handleSearch();
  };

  const queryValidation = () => {
    validationQuery(Query);
  };

  let queryValueArray = [];
  displayQueryIncremental &&
    displayQueryIncremental.length &&
    displayQueryIncremental.map((item) => queryValueArray.push(item.query));

  const value = `(${queryValueArray.join(" OR ")})`;

  return (
    <div className={`patent-view-search-table ${isQuickView ? "m-0" : ""} `}>
      <div className="search-section-patent align-items-stretch">
        <div
          className={`content-editable ${isIncremental ? "isOpen" : ""} ${
            !isIncremental ? "hide-query" : ""
          }`}
        >
          {" "}
          {isIncremental && <div className="query_heading">Current Query</div>}
          <ContentEditable
            value={Query}
            height="100px"
            width={isIncremental ? "40%" : "90%"}
            onChange={handleChange}
            isShowDummyWrapper={true}
          />
        </div>
        {isIncremental && (
          <div className="previous_queery">
            <div className="query_heading" onClick={onOpenModal}>
              Previous Query
              <div className="edit-button">
                <BiEdit
                  alt="edit"
                  className="img-fluid"
                  width="30"
                  height="30"
                />
              </div>
            </div>
            <ContentEditable
              value={value}
              height="100px"
              width={isIncremental ? "40%" : "90%"}
              onChange={() => {}}
              isReadOnly={true}
            />
          </div>
        )}

        <div className="patent-button-search d-flex align-items-end ps-2">
          <RWireButton
            cNameDiv="search-query"
            buttonCName="input-button-text-form"
            name="Search"
            buttonImg={RWIRE_IMAGES.RwireSearchBlackIcon}
            onClick={handleClick}
          />
        </div>
      </div>
      {Query ? (
        <div className="text-area-syntax mt-1 mx-2">
          {syntaxqueryCorrect ? (
            <div style={{ color: "green" }}>{syntaxqueryCorrect}</div>
          ) : (
            <div style={{ color: "#f00" }}>{syntaxqueryError}</div>
          )}
          <div
            className="syntax-check text-box check-box"
            onClick={queryValidation}
          >
            Check Syntax
            <input type="checkbox" className="mx-2" checked />
          </div>
        </div>
      ) : (
        <div className="text-area-syntax text-area-syntax-opcaity  mt-2 mx-2">
          {syntaxqueryCorrect ? (
            <div style={{ color: "green" }}>{syntaxqueryCorrect}</div>
          ) : (
            <div style={{ color: "#f00" }}>{syntaxqueryError}</div>
          )}
          <div className="syntax-check text-box check-box">
            Check Syntax
            <input type="checkbox" className="mx-2" checked disabled />
          </div>
        </div>
      )}
    </div>
  );
};

export default RWirePatentsSearch;
