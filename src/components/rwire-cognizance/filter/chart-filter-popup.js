import { filterOptions } from "../../../common/utils";
import plusButton from "../../../images/plus-btn.svg";
import FilterBlock from "./filter-block";
import Select from "react-select";
import { aggregationData as selectFilterAggQuery } from "../functions/aggregationQuery";
import RWireButton from "../../rwire-ui/rwire-button/rwire-button";
import { useTranslation } from "react-i18next";
import { chart_filters_options } from "../../constant";
import { search } from "../../../service/elasticSearch";
import { displayError } from "../../../service/display-error";

const ChartFilterPopup = (props) => {
  const { t } = useTranslation();

  const {
    listFilters,
    onSetChart,
    onGetResult,
    chartId,
    onHandleClearFilters,
  } = props;

  const handleGetResult = () => {
    onGetResult();
  };

  const handleSelect = async (value) => {
    let isFound =
      listFilters[chartId] &&
      listFilters[chartId].find(
        (o) => Object.keys(o.selected)[0] === value.value
      );
    if (Boolean(!isFound)) {
      let queryObj = JSON.parse(localStorage.getItem("storedQueryDetails"));
      if (listFilters[chartId] && listFilters[chartId].length > 0) {
        let chartFilters = [];
        listFilters[chartId].forEach((filter) => {
          if (Object.values(filter.selected)[0].length > 0)
            chartFilters.push(filter.selected);
        });
        queryObj.chartFilters = chartFilters;
      }
      queryObj = {
        queryToSearch: queryObj.queryToSearch,
        filters: queryObj.filters,
        isNumberWithIncludeSearch: queryObj.isNumberWithIncludeSearch,
        selectedIncludes : queryObj.selectedIncludes,
        chartFilters: queryObj.chartFilters,
        aggregationField: value.value,
      };
      const body = JSON.stringify(queryObj);

      try {
        const dataResponse = await search(body, chart_filters_options);
        const filterOption = dataResponse.data.aggregations;

        const count =
          parseInt(
            listFilters[chartId] && listFilters[chartId].length > 0
              ? listFilters[chartId].length
              : 0
          ) + 1;

        let newListFilters = { ...listFilters };

        if (!newListFilters[chartId]) {
          newListFilters = { [chartId]: [], ...newListFilters };
        }

        newListFilters[chartId].unshift({
          id: count,
          data: filterOption[value.value].buckets,
          selected: { [value.value]: [] },
          isLoadMore: filterOption[value.value].sum_other_doc_count > 0,
        });

        onSetChart({ listFilters: newListFilters });
      } catch (error) {
        displayError(error);
      }
    }
  };

  const dropdownIndicatorStyles = () => {
    return (
      <img
        className="img-fluid plus-icon filter-popup-plus mx-2"
        alt=""
        src={plusButton}
      />
    );
  };

  const filterOptionSelected = (option, inputValue) => {
    let isFound =
      listFilters[chartId] &&
      listFilters[chartId].find(
        (o) => Object.keys(o.selected)[0] === option.value
      );

    return Boolean(!isFound);
  };

  return (
    <div className="w-25">
      <Select
        options={filterOptions}
        onChange={handleSelect}
        placeholder={"Select Filters"}
        components={{ DropdownIndicator: dropdownIndicatorStyles }}
        filterOption={filterOptionSelected}
        isSearchable={false}
        value={""}
        styles={{
          option: (provided) => ({
            ...provided,
            fontSize: 12,
            cursor: "pointer",
          }),
          control: (styles) => ({
            ...styles,
            cursor: "pointer",
            fontSize: 12,
          }),
        }}
      />

      <div className="d-flex justify-content-between mt-2">
        <RWireButton
          buttonCName="input-button-text-form normal-button medium-width"
          onClick={handleGetResult}
        >
          {t("apply_filters")}
        </RWireButton>
        <RWireButton
          buttonCName="input-button-text-form normal-button medium-width input-button-form"
          onClick={onHandleClearFilters}
        >
          {t("clear_filters")}
        </RWireButton>
      </div>
      <div className="mt-3 overflow-auto filter-left-block normal-scroll-bar">
        {listFilters[chartId] &&
          listFilters[chartId].map((item, k) => {
            return (
              <FilterBlock
                key={item.id}
                id={item.id}
                listFilterKey={k}
                listFilters={listFilters}
                listFiltersItem={item}
                onSetChart={onSetChart}
                onGetResult={onGetResult}
                chartId={chartId}
                onAggregationData={selectFilterAggQuery}
                filterOptions={filterOptions}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ChartFilterPopup;
