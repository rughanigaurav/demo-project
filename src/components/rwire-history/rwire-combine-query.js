import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "rsuite";
import { addHistory, getQueryCount } from "../../action/history";
import RWIRE_IMAGES from "../common/common-functions/rwire-images";
import RWireButton from "../rwire-ui/rwire-button/rwire-button";

export const RwireCombineQuery = (props) => {
  const {
    selectedRowsForCombine,
    selectedItemList,
    onSetApp,
    onRwireSearchAPI,
    onFetchHistory,
    onSetExportSelected,
    onSetSelectedRows,
    onSetItemPerPage,
  } = props;
  const [fullQuery, setFullQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  useEffect(() => {
    if (selectedRowsForCombine.length === 1) {
      setFullQuery(selectedRowsForCombine[0]);
    } else if (selectedRowsForCombine.length > 1) {
      setErrorText("");
      setFullQuery(
        fullQuery +
          " OR " +
          selectedRowsForCombine[selectedRowsForCombine.length - 1]
      );
      setFullQuery(selectedRowsForCombine.join(" OR "));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRowsForCombine]);
  const handleChange = (str) => {
    setFullQuery(str);
  };

  const handleSearch = () => {
    if (selectedRowsForCombine.length === 1) {
      setErrorText(" Please select minimum 2 queries for combine");
    } else if (fullQuery) {
      let numbers = fullQuery.match(/\d+/g);
      let operators = fullQuery.match(/(OR|AND|NOT)/gim);
      let searchQuery = [];
      let queryLists = {};
      selectedItemList.forEach((query) => {
        queryLists = { ...queryLists, [query.userSearchNumber]: query.query };
      });
      let invalidFlag = false;
      // eslint-disable-next-line array-callback-return
      numbers.map((id, index) => {
        if (selectedRowsForCombine.includes(id)) {
          // eslint-disable-next-line no-useless-concat
          let realQuery =
            "(" +
            queryLists[id] +
            ")" +
            " " +
            (operators ? (operators[index] ? operators[index] : "") : "");
          searchQuery.push(realQuery.replaceAll("( ","(").replaceAll(" )",")"));
        } else {
          invalidFlag = true;
          // eslint-disable-next-line no-console
          console.log("Please enter query number from selected patents only !");
        }
      });
      searchQuery = searchQuery.join(" ");
      if (!invalidFlag) {
        onSetApp({ searchQuery: searchQuery });
        onRwireSearchAPI(searchQuery).then((data) => {
          if (data) {
            navigate("/en/rwire-patents");
            onSetItemPerPage({ selectedRowsForCombine: [] });
            onSetSelectedRows({ selectedRows: [] });
            onSetExportSelected({ selectedItemList: [] });
          } else {
            // eslint-disable-next-line no-console
            console.log(props.error);
          }
        });
      }
    }
  };
  const handleSave = async () => {
    if (selectedRowsForCombine.length === 1) {
      setErrorText(" Please select minimum 2 queries for combine");
    } else if (fullQuery) {
      let numbers = fullQuery.match(/\d+/g);
      let operators = fullQuery.match(/(OR|AND|NOT)/gim);
      let searchQuery = [];
      let queryLists = {};
      selectedItemList.forEach((query) => {
        queryLists = { ...queryLists, [query.userSearchNumber]: query.query };
      });
      let invalidFlag = false;
      // eslint-disable-next-line array-callback-return
      numbers.map((id, index) => {
        if (selectedRowsForCombine.includes(id)) {
          // eslint-disable-next-line no-useless-concat
          let realQuery =
            "(" +
            queryLists[id] +
            ")" +
            " " +
            (operators ? (operators[index] ? operators[index] : "") : "");
          searchQuery.push(realQuery.replaceAll("( ","(").replaceAll(" )",")"));
        } else {
          invalidFlag = true;
          // eslint-disable-next-line no-console
          console.log("Please enter search query number from available list only !");
        }
      });
      searchQuery = searchQuery.join(" ");
      if (!invalidFlag) {
        const resultTotal = await getQueryCount(searchQuery);

        await addHistory({
          query: searchQuery,
        numberOfHits: resultTotal.count,
        });

        await onSetApp({
          queryEvaluatorText: searchQuery,
          queryEvaluatorExpertSearchError: "",
        });

        setTimeout(async () => {
          await onFetchHistory();
        }, 1000);
      }
    }
  };
  return (
    <>
      <div className="combine_section">
        <div
          className={`combine_tooltip ${
            isFocused ? "focused_tooltip" : "blurred_tooltip"
          } `}
        >
          Available Operators: AND | OR | NOT
        </div>
        <Input
          as="textarea"
          rows={7}
          className={`combine_textarea ${
            isFocused ? "focused_combine" : "blurred_combine"
          } `}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={fullQuery}
          onChange={handleChange}
        />
        <div className="d-flex">
          <div className="combine-error">{errorText}</div>
        </div>
        <div className="d-flex justify-content-end">
          <div className="combine-buttons">
            <div className="clearall search-query">
              <button
                className={`clear-all input-button-text-form ${
                  fullQuery ? "" : "text-syntax-opcaity"
                }`}
                onClick={handleSave}
              >
                Save
              </button>
            </div>
            {fullQuery ? (
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
    </>
  );
};
