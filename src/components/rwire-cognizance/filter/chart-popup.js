import { useEffect, useState } from "react";
import ReactFC from "react-fusioncharts";
import ChartFilterPopup from "./chart-filter-popup";
import TopNumberFilter from "./top-number-filter";
import CombineFields from "./combine-fields";
import Modal from "react-bootstrap/Modal";
import {
  formatAggregationSingleValueChartData,
  chartAndMergeDataProcess,
  manageExtraNodes,
} from "../functions/searchAggregationQuery";
import ChartTypeOptions from "./chart-type-options";
import { getChartConfig, getChartSetting } from "../functions/chart-config";
import ExcludeBlock from "./exclude-in-chart-block";
import ExcludeList from "./exclude-list";
import RWireButton from "../../rwire-ui/rwire-button/rwire-button";
import { useTranslation } from "react-i18next";
import { chart_data, chart_filters_options } from "../../constant";
import { displayError } from "../../../service/display-error";
import { search } from "../../../service/elasticSearch";

const getHeightOfChartAsPerScreen = () => {
  let chartHeight = "500";
  if (window && window.innerWidth <= 1599) {
    chartHeight = "350";
  }
  if (window && window.innerWidth >= 2560) {
    chartHeight = "850";
  }
  return chartHeight;
};

const ChartPopup = (props) => {
  const { t } = useTranslation();

  const {
    config,
    onSetIsModelOpen,
    isCountryMap,
    isMultiSeries = false,
    chartRowData,
    chartConfig,
    chartTitle,
    modalTypeOpen,
    listMerge,
    listFilters,
    listTopNumbers,
    chartId,
    isFilterModal,
    onHandleFilter,
    onSetChart,
    onApplyFilter,
    field1,
    field2,
    isDarkMode,
    item
  } = props;
  const [updateConfig, setUpdateConfig] = useState(config);
  const [chartType, setChartType] = useState(config.type);
  const [chartChangeData, setChartChangeData] = useState(chartRowData);
  const [excludeData, setExcludeData] = useState([]);

  // const store = useStore();
  // const {
  //   chart: { darkTheme },
  // } = store.getState();

  useEffect(() => {
    let newConfig = getChartConfig({
      ...chartConfig.dataSource.chart,
      type: config.type,
      field1,
      field2,
      width: "100%",
      height: getHeightOfChartAsPerScreen(),
      data: config.dataSource.data,
      mergeData: config.dataSource.mergeData,
      dataset: config.dataSource.dataset,
      categories: config.dataSource.categories,
      colorrange: config.dataSource.colorrange,
      showLegend: "1",
      chartTitle,
      showLabels: config.dataSource.chart.showLabels,
      publicationCountryData: config.dataSource.publicationCountryData,
      markers: config.dataSource.markers,
      markerBgColor: "#FF0000",
      isDarkMode,
    });

    setUpdateConfig({ ...newConfig });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeChartDataAsPerMerge = (newListMerge = {}) => {
    let chartData = updateConfig.dataSource.data;
    let data = chartAndMergeDataProcess(
      { data: chartData },
      newListMerge[chartId]
    );

    updateConfig.dataSource = { ...updateConfig.dataSource, ...data };
    let newUpdateConfig = { ...updateConfig };
    setUpdateConfig(newUpdateConfig);
  };

  const handleClearFilters = async () => {
    await onSetChart({ listFilters: [] });
    let queryObj = JSON.parse(localStorage.getItem("storedQueryDetails"));

    queryObj = {
      queryToSearch: queryObj.queryToSearch,
      isNumberWithIncludeSearch: queryObj.isNumberWithIncludeSearch,
      selectedIncludes: queryObj.selectedIncludes,
      filters: queryObj.filters,
      field1,
      field2,
      isMultiSeries,
      topNumber: listTopNumbers[chartId],
    };
    const body = JSON.stringify(queryObj);

    try {
      const dataResponse = await search(body, chart_data);
      const chartData = dataResponse.data.aggregations;
      if (chartData) {
        setChartChangeData(chartData);
        let data = formatAggregationSingleValueChartData(
          chartData,
          chartType,
          field1,
          field2,
          isMultiSeries,
          listMerge[chartId],
          excludeData
        );

        updateConfig.dataSource = { ...updateConfig.dataSource, ...data };
        let newUpdateConfig = { ...updateConfig };
        setUpdateConfig(newUpdateConfig);
      }
    } catch (error) {
      displayError(error);
    }
  };

  const handleTopResultSet = async (
    newListMerge = listMerge,
    topNumber = "10"
  ) => {
    let newListTopNumbers = listTopNumbers;

    newListTopNumbers = { ...newListTopNumbers, [chartId]: topNumber };

    onSetChart({ listTopNumbers: newListTopNumbers });

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
      isNumberWithIncludeSearch: queryObj.isNumberWithIncludeSearch,
      selectedIncludes: queryObj.selectedIncludes,
      filters: queryObj.filters,
      /*
      I have added the code for chart filter. However previously top result
      have not considered chart filters. But it seems necessary, hence
      for that reason I have included chart filters while fetching data throguh API.
      To exclude chart filters, comment next line.
      */
      chartFilters: queryObj.chartFilters,
      field1,
      field2,
      isMultiSeries,
      topNumber: topNumber,
    };
    const body = JSON.stringify(queryObj);

    try {
      const dataResponse = await search(body, chart_data);
      const chartData = dataResponse.data.aggregations;
      if (chartData) {
        setChartChangeData(chartData);
        let data = formatAggregationSingleValueChartData(
          chartData,
          chartType,
          field1,
          field2,
          isMultiSeries,
          newListMerge[chartId],
          excludeData
        );

        updateConfig.dataSource = { ...updateConfig.dataSource, ...data };
        let newUpdateConfig = { ...updateConfig };
        setUpdateConfig(newUpdateConfig);

        if (
          newListMerge &&
          newListMerge[chartId] &&
          newListMerge[chartId].data.length > 0
        ) {
          let mergeData = manageExtraNodes(data, newListMerge[chartId]);

          newListMerge[chartId] = {
            data: [...mergeData.data],
          };

          onSetChart({ listMerge: { ...newListMerge } });
        }
      }
    } catch (error) {
      displayError(error);
    }
  };

  const getResult = async (isForce) => {
    if ((listFilters[chartId] && listFilters[chartId].length > 0) || isForce) {
      let queryObj = JSON.parse(localStorage.getItem("storedQueryDetails"));
      let chartFilters = [];
      listFilters[chartId].forEach((filter) => {
        if (Object.values(filter.selected)[0].length > 0)
          chartFilters.push(filter.selected);
      });
      queryObj.chartFilters = chartFilters;
      queryObj = {
        queryToSearch: queryObj.queryToSearch,
        isNumberWithIncludeSearch: queryObj.isNumberWithIncludeSearch,
        selectedIncludes: queryObj.selectedIncludes,
        filters: queryObj.filters,
        chartFilters: queryObj.chartFilters,
        field1,
        field2,
        isMultiSeries,
        topNumber: listTopNumbers[chartId],
      };
      const body = JSON.stringify(queryObj);

      try {
        const dataResponse = await search(body, chart_data);
        const chartData = dataResponse.data.aggregations;
        if (chartData) {
          setChartChangeData(chartData);
          let data = formatAggregationSingleValueChartData(
            chartData,
            chartType,
            field1,
            field2,
            isMultiSeries,
            listMerge[chartId],
            excludeData
          );

          updateConfig.dataSource = { ...updateConfig.dataSource, ...data };
          let newUpdateConfig = { ...updateConfig };
          setUpdateConfig(newUpdateConfig);
        }
      } catch (error) {
        displayError(error);
      }
      listFilters[chartId].map(async (item, k) => {
        const filterName = Object.keys(item.selected)[0];
        queryObj = {
          queryToSearch: queryObj.queryToSearch,
          filters: queryObj.filters,
          isNumberWithIncludeSearch: queryObj.isNumberWithIncludeSearch,
          chartFilters: queryObj.chartFilters,
          aggregationField: filterName,
        };
        const body = JSON.stringify(queryObj);

        try {
          const dataResponse = await search(body, chart_filters_options);
          const filterOption = dataResponse.data.aggregations;
          let newListFilters = { ...listFilters };

          newListFilters[chartId][k].data = filterOption[filterName].buckets;
          newListFilters[chartId][k].isLoadMore =
            filterOption[filterName].sum_other_doc_count > 0;

          onSetChart({ listFilters: newListFilters });
        } catch (error) {
          displayError(error);
        }
      });
    }
  };

  const handleChartType = (type) => {
    setChartType(type);
    let data = formatAggregationSingleValueChartData(
      chartChangeData,
      type,
      field1,
      field2,
      isMultiSeries,
      listMerge[chartId],
      excludeData
    );

    updateConfig.dataSource = { ...updateConfig.dataSource, ...data };

    updateConfig.dataSource.chart = {
      ...updateConfig.dataSource.chart,
      ...getChartSetting(type),
    };
    let chartConfig = {
      ...updateConfig,
      type,
    };

    setUpdateConfig({ ...chartConfig });
  };

  const handleClose = () => {
    onHandleFilter(false);
    onSetIsModelOpen(false);
  };

  const handleApplyFilterButton = () => {
    onApplyFilter(JSON.parse(JSON.stringify(updateConfig)));

    handleClose();
    onSetIsModelOpen(false);
  };

  const handleExclude = (e) => {
    let excludeDataLabel =
      updateConfig.dataSource.data[e.target.dataset.index].label;

    updateConfig.dataSource.data.splice(e.target.dataset.index, 1);

    updateConfig.dataSource = {
      ...updateConfig.dataSource,
      ...chartChangeData,
    };
    let newUpdateConfig = { ...updateConfig };
    setUpdateConfig(newUpdateConfig);

    let tooltipBlock = document.getElementById("tooltip-block");
    if (tooltipBlock) {
      tooltipBlock.classList.add("d-none");
    }

    excludeData.push(excludeDataLabel);

    setExcludeData(excludeData);
  };

  const handleInclude = (e) => {
    let data = formatAggregationSingleValueChartData(
      chartChangeData,
      chartType,
      field1,
      field2,
      isMultiSeries,
      listMerge[chartId],
      excludeData
    );

    updateConfig.dataSource = { ...updateConfig.dataSource, ...data };
    let newUpdateConfig = { ...updateConfig };
    setUpdateConfig(newUpdateConfig);
  };

  const mergeData =
    updateConfig &&
    updateConfig.dataSource &&
    updateConfig.dataSource.mergeData;

  return (
    <Modal
      show={isFilterModal}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="chart-filter-modal"
    >
      <Modal.Body>
        <div className="d-flex justify-content-center">
          {modalTypeOpen === "filter" ? (
            <ChartFilterPopup
              {...props}
              onGetResult={getResult}
              onHandleClearFilters={handleClearFilters}
            />
          ) : (
            ""
          )}
          <ExcludeBlock onHandleExclude={handleExclude} />

          <div
            className={`${
              modalTypeOpen === "filter" ? "w-75" : "w-100"
            } medium-modal space-around-modal-large d-flex justify-content-center align-items-center py-4`}
          >
            <div className="chart-filter modal-option position-absolute">
              <ChartTypeOptions
                onHandleChartType={handleChartType}
                onHandleClose={handleClose}
                isCountryMap={isCountryMap}
                isMultiSeries={isMultiSeries}
                availableChartList={item.availableChartList}
              />
              <div className="d-flex justify-content-end mt-3">
                {!updateConfig.type.includes("maps/") && (
                  <CombineFields
                    updateConfig={updateConfig}
                    mergeData={mergeData}
                    onGetResult={handleTopResultSet}
                    chartId={chartId}
                    onSetChart={onSetChart}
                    listMerge={listMerge}
                    topNumberSize={listTopNumbers[chartId]}
                    listTopNumbers={listTopNumbers}
                    onChangeChartDataAsPerMerge={changeChartDataAsPerMerge}
                  />
                )}
                <TopNumberFilter
                  onHandleTopResultSet={handleTopResultSet}
                  topNumberSize={listTopNumbers[chartId]}
                />
              </div>
            </div>

            <div className="w-100 text-center chart-filter-modal">
              <ReactFC {...updateConfig} />
              <div className={`d-flex justify-content-end`}>
                <RWireButton
                  buttonCName="input-button-text-form normal-button medium-width"
                  onClick={handleApplyFilterButton}
                >
                  {t("apply")}
                </RWireButton>
              </div>
              <ExcludeList
                excludeData={excludeData}
                onSetExcludeData={setExcludeData}
                onHandleInclude={handleInclude}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ChartPopup;
