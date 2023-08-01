import React, { useEffect, useState } from "react";
import { Checkbox, CheckboxGroup, Input } from "rsuite";
import { checkIfObjIsBlank } from "../patents-result-common/rwire-patents-filter-details";
import loaderGIF from "../../../assets/images/loader.gif";
import { getSortedArray } from "../../../action/patent-view";

function LapseYear(props) {
  const {
    filterOptionsData,
    openedFilterName,
    filtersSearchText,
    filtersSelected,
    clickedOnClear,
    filterList,
    onGetFiltersOptions,
    isLoadingFilterData,
    index,
    onRwireSearchAPI
  } = props;

  const [value, setValue] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [tempDataArray, setTempDataArray] = useState([]);
  const [searchInputText, setSearchInputText] = useState("");
  useEffect(() => {
    setSearchInputText(filtersSearchText["ED"] ? filtersSearchText["ED"] : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersSearchText]);
  useEffect(() => {
    if (
      Object.keys(filtersSelected).length !== 0 &&
      checkIfObjIsBlank(filtersSelected)
    ) {
      setSearchInputText("");
      onGetFiltersOptions({
        isIndivisual: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersSelected]);

  useEffect(() => {
    setTempDataArray([]);
    if (filterOptionsData["ED"]) {
      // eslint-disable-next-line array-callback-return
      let temp = filterOptionsData["ED"].buckets.map(
        (patent) => patent.key_as_string
      );
      setTempDataArray(temp);

      setFinalData(filterOptionsData["ED"].buckets);
    }
  }, [filterOptionsData, filterList]);

  useEffect(() => {
    setValue([]);
  }, [clickedOnClear]);

  useEffect(() => {
    if (filtersSelected.ED) {
      setValue(filtersSelected.ED);
    }
  }, [filtersSelected]);
  const handleCheckAll = (value, checked) => {
    setValue(checked ? tempDataArray : []);
  };
  const handleResetSelection = () => {
    setValue([]);
    if (filtersSelected["ED"] && filtersSelected["ED"].length > 0) {
      handleClearAll();
    }
  };
  const handleChange = (value) => {
    setValue(value);
    if (
      value &&
      value.length === 0 &&
      filtersSelected["ED"] &&
      [filtersSelected["ED"]].length > 0
    ) {
      handleClearAll();
    }
  };
  const handleApply = () => {
    props.onSetFilter({
      lapseYearSelected: value,
      openedFilterName: "",
      filtersSelected: { ...filtersSelected, ED: value },
      dataFrom: 0,
      activePages: 1,
    });
    onRwireSearchAPI("", {
      isReRunId: true,
    });
    onGetFiltersOptions({
      isDisplayListFilters: true,
    });
  };
  const handleClearAll = () => {
    props.onSetFilter({
      lapseYearSelected: [],
      filtersSelected: { ...filtersSelected, ED: [] },
      dataFrom: 0,
      activePages: 1,
    });
    onRwireSearchAPI("", {
      isReRunId: true,
    });
    onGetFiltersOptions({
      isDisplayListFilters: true,
    });
  };
  const handleSearchChange = (e) => {
    let str = e;
    setSearchInputText(str);
    if (str <= Math.max(...tempDataArray)) {
      props.onSetFilter({
        filtersSearchText: { ...filtersSearchText, ED: str ? str : null },
      });
      onGetFiltersOptions({
        isIndivisual: true,
      });
    }
  };

  return (
    <div
      className={`filter-modal p-3 ${
        openedFilterName === "lapse_year" ? "filter-modal-active" : ""
      } ${index >= 3 ? "filter-modal-fixed" : "filter-modal-absolute"}`}
    >
      <div className="d-flex justify-content-between">
        <Input
          className="filter-modal-searchInput"
          value={searchInputText}
          placeholder={`Search For Lapse Year`}
          onChange={handleSearchChange}
        />
        <div className="d-flex justify-content-between">
          <h6
            className="filter-clearAll-btn"
            onClick={handleResetSelection}
            style={{ color: "#0048A2" }}
          >
            Clear All
          </h6>
          {finalData.length !== 0 && (
            <Checkbox
              checked={value.length === finalData.length}
              onChange={handleCheckAll}
              style={{ color: "#0048A2" }}
            >
              Select All
            </Checkbox>
          )}
          <button type="button" className="ms-5 btn" onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
      <div className="filters-sublist mt-3 p-3">
        {isLoadingFilterData ? (
          <div className="filters_loader">
            <img
              src={loaderGIF}
              alt="Computer man"
              className="filter-loader-img"
            ></img>
          </div>
        ) : tempDataArray.length === 0 ? (
          <div className="filters_loader">
            <h6 className="text-secondary">Data Not Available</h6>
          </div>
        ) : (
          <CheckboxGroup
            name="checkboxList"
            value={value}
            onChange={handleChange}
          >
            <ul className="filter-names d-flex  flex-wrap">
              {finalData &&
                getSortedArray(
                  finalData,
                  "key_as_string",
                  openedFilterName
                ).map((item) => (
                  <Checkbox key={item.key} value={item.key_as_string}>
                    {item.key_as_string} ({item.aggsUniqueCount.value})
                  </Checkbox>
                ))}
            </ul>
          </CheckboxGroup>
        )}
      </div>
    </div>
  );
}

export default LapseYear;
