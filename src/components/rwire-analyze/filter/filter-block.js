import Accordion from "react-bootstrap/Accordion";
import { fieldTypeChecking } from "../../../resources/data/mapping";
import moment from "moment";
import FilterRow from "./filter-row";
import Close from "../../../images/close-icon-white.svg";
import { displayError } from "../../../service/display-error";
import { chart_filters_options } from "../../constant";
import { search } from "../../../service/elasticSearch";

const FilterBlock = (props) => {
  const {
    id,
    listFilterKey,
    filterOptions,
    currentSheet,
    listFiltersItem,
    onGetResult,
    chartId,
    onSetGenerateChart,
  } = props;

  const changeFilterName = Object.keys(listFiltersItem["selected"])[0];
  const listFilters =
    props[currentSheet] && props[currentSheet].listFilters
      ? props[currentSheet].listFilters
      : [];

  const handleSearchFilter = async (e) => {
    const value = e.target.value;

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
      /*
      I have added the code for chart filter. However previously filter search
      have not considered chart filters. But it seems necessary, hence
      for that reason I have included chart filters while fetching data throguh API.
      To exclude chart filters, comment next line.
      */
      chartFilters: queryObj.chartFilters,
      aggregationField: changeFilterName,
      aggregationFilterSearchtext: value,
    };
    const body = JSON.stringify(queryObj);

    try {
      const dataResponse = await search(body, chart_filters_options);
      const filterOption = dataResponse.data.aggregations;
      listFiltersItem.data = filterOption[changeFilterName].buckets;
      listFiltersItem.isLoadMore =
        filterOption[changeFilterName].sum_other_doc_count > 0;

      onSetGenerateChart({
        [currentSheet]: {
          ...props[currentSheet],
          listFilters: { ...listFilters },
        },
      });
    } catch (error) {
      displayError(error);
    }
  };

  const handleLoadMore = async () => {
    listFiltersItem["size"] =
      (listFiltersItem["size"] ? listFiltersItem["size"] : 10) + 10;

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
      aggregationField: changeFilterName,
      aggregationSize: listFiltersItem["size"],
    };
    const body = JSON.stringify(queryObj);

    try {
      const dataResponse = await search(body, chart_filters_options);
      const filterOption = dataResponse.data.aggregations;
      listFiltersItem.data = filterOption[changeFilterName].buckets;
      listFiltersItem.isLoadMore =
        filterOption[changeFilterName].sum_other_doc_count > 0;

      onSetGenerateChart({
        [currentSheet]: {
          ...props[currentSheet],
          listFilters: { ...listFilters },
        },
      });
    } catch (error) {
      displayError(error);
    }
  };

  const handleRemoveFilter = () => {
    let newListFilters = { ...listFilters };

    newListFilters[chartId].splice(listFilterKey, 1);

    onSetGenerateChart({
      [currentSheet]: { ...props[currentSheet], listFilters: newListFilters },
    });

    onGetResult(true);
  };

  const fullFilterName = filterOptions.filter(
    (i) => i.value === Object.keys(listFiltersItem["selected"])[0]
  );

  return (
    <Accordion defaultActiveKey="0" flush className="custom-accordion">
      <Accordion.Item eventKey="0">
        <div key={id} className={`border my-2`}>
          <div className="accordion-item">
            <Accordion.Header flush as="div">
              <div className="w-100">
                <div className="border p-2 d-flex justify-content-between align-items-center rounded  active-filters-block">
                  <div className="filter-block-title">
                    {`${fullFilterName[0].label}
                    ${
                      Object.values(listFiltersItem["selected"])[0].length
                        ? `(${
                            Object.values(listFiltersItem["selected"])[0].length
                          })`
                        : ``
                    }`}
                  </div>
                  <img
                    src={Close}
                    className="cursor-pointer"
                    alt=""
                    width="12"
                    height="12"
                    onClick={handleRemoveFilter}
                  />
                </div>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-2 filters-individual-list normal-scroll-bar">
                <div>
                  <input
                    type="text"
                    className="form-control input_field search-box-input"
                    placeholder="Search..."
                    onChange={handleSearchFilter}
                  />
                </div>
                <div className="pt-3">
                  {listFiltersItem.data &&
                    listFiltersItem.data.map((i) => {
                      const filterName = i.key_as_string
                        ? listFiltersItem["selected"] &&
                          fieldTypeChecking[
                            Object.keys(listFiltersItem["selected"])[0]
                          ].type === "date"
                          ? moment(i.key_as_string).format("YYYY")
                          : i.key_as_string
                        : i.key;

                      const isSelected =
                        listFiltersItem &&
                        listFiltersItem["selected"] &&
                        Object.values(listFiltersItem["selected"])[0].includes(
                          filterName
                        );

                      return (
                        <FilterRow
                          {...props}
                          key={i.key}
                          filterName={filterName}
                          filterDocCount={i.doc_count}
                          isSelected={isSelected}
                          listFilters={listFilters}
                          id={id}
                          onGetResult={onGetResult}
                          chartId={chartId}
                          currentSheet={currentSheet}
                        />
                      );
                    })}
                  {listFiltersItem.isLoadMore ? (
                    <div
                      className="load-more cursor-pointer"
                      onClick={handleLoadMore}
                    >
                      Load more
                    </div>
                  ) : null}
                </div>
              </div>
            </Accordion.Body>
          </div>
        </div>
      </Accordion.Item>
    </Accordion>
  );
};

export default FilterBlock;
