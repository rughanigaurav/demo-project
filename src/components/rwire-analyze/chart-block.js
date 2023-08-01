import { useEffect, useState } from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import Powercharts from "fusioncharts/fusioncharts.powercharts";
import TreeCharts from "fusioncharts/fusioncharts.treemap";
/* eslint-disable */
import World from "../../lib/chart/fusioncharts.worldwithcountries";
import Maps from "fusioncharts/fusioncharts.maps";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { dFlexAlignCenterJustifyCenter } from "../../common/class-name";
import { formatAggregationSingleValueChartData } from "../rwire-cognizance/functions/searchAggregationQuery";
import { getChartSetting } from "../rwire-cognizance/functions/chart-config";
import ChartPopup from "./popup/chart-popup";
import ChartTypeOptions from "./filter/chart-type-options";
import { initialData } from "../../common/generate-chart-initial-data";
import { displayError } from "../../service/display-error";
import { chart_data } from "../constant";
import { search } from "../../service/elasticSearch";

charts(FusionCharts);
//
Powercharts(FusionCharts);
TreeCharts(FusionCharts);
FusionTheme(FusionCharts);
ReactFC.fcRoot(FusionCharts, Maps, World, FusionTheme);

const ChartBlock = (props) => {
  const {
    field1,
    field2,
    chartConfig,
    chartMainTitle,
    isMultiSeries,
    listMerge,
    chartId,
    onSetGenerateChart,
    currentSheet,
    isFilterModal,
    setIsFilterModal,
    isDarkMode,
  } = props;

  const [config, setConfigs] = useState(chartConfig);
  const [isLoading, setLoading] = useState(true);
  const [chartData, setChartData] = useState();
  // eslint-disable-next-line
  const [chartTitle, setChartTitle] = useState(chartMainTitle);

  const [modalTypeOpen, setModalTypeOpen] = useState();

  const listFilters = props[currentSheet].listFilters
    ? props[currentSheet].listFilters
    : [];

  const listTopNumbers = props[currentSheet].listTopNumbers
    ? props[currentSheet].listTopNumbers
    : [];

  useEffect(() => {
    setLoading(true);
    getResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading(true);
    // setConfigs(chartConfig);

    getResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field1, field2, isDarkMode]);

  const handleFilter = () => {
    setIsFilterModal(!isFilterModal);
    setModalTypeOpen("filter");
  };

  async function getResult() {
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
      selectedIncludes : queryObj.selectedIncludes,
      filters: queryObj.filters,
      chartfilters: queryObj.chartFilters,
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
        setChartData(chartData);
        let data = formatAggregationSingleValueChartData(
          chartData,
          chartConfig.type,
          field1,
          field2,
          isMultiSeries,
          listMerge[chartId],
          []
        );

        config.dataSource = {
          ...config.dataSource,
          ...chartConfig.dataSource,
          ...data,
        };
        onSetGenerateChart({
          [currentSheet]: { ...props[currentSheet], ...config.dataSource },
        });
        setConfigs({ ...config });
        setLoading(false);
      }
    } catch (error) {
      displayError(error);
    }
  }

  if (isLoading) {
    return (
      <>
        <div className="column position-relative">
          <div className="chart-card">
            <span className={`p-5 ${dFlexAlignCenterJustifyCenter}`}>
              Loading...
            </span>
          </div>
        </div>
      </>
    );
  }

  const handleChartType = (type) => {
    let data = formatAggregationSingleValueChartData(
      chartData,
      type,
      field1,
      field2,
      isMultiSeries,
      listMerge[chartId],
      []
    );

    config.dataSource = { ...config.dataSource, ...data };

    config.dataSource.chart = {
      ...config.dataSource.chart,
      ...getChartSetting(type),
    };
    let chartConfig = {
      ...config,
      type,
    };

    onSetGenerateChart({
      [currentSheet]: { ...props[currentSheet], ...chartConfig },
    });
    setConfigs({ ...chartConfig });
  };

  const onApplyFilter = (updateConfig) => {
    updateConfig.dataSource.chart.showLegend = "0";

    setConfigs({ ...updateConfig });
  };

  const handleDeleteSheet = (updateConfig) => {
    onSetGenerateChart({ [currentSheet]: { ...initialData } });
  };

  return (
    <>
      <div className="modal-option">
        <ChartTypeOptions
          onHandleChartType={handleChartType}
          isMultiSeries={isMultiSeries}
          onHandleClose={handleDeleteSheet}
        />
      </div>
      <div className=" position-relative">
        <div className=" d-flex justify-content-center mt-3">
          <ReactFC {...config} />
        </div>
      </div>
      <ChartPopup
        config={JSON.parse(JSON.stringify(config))}
        isFilterModal={isFilterModal}
        onHandleFilter={handleFilter}
        onApplyFilter={onApplyFilter}
        isMultiSeries={isMultiSeries}
        field1={field1}
        field2={field2}
        chartRowData={chartData}
        modalTypeOpen={modalTypeOpen}
        chartTitle={chartTitle}
        isHideChartOption={true}
        {...props}
      />
    </>
  );
};

export default ChartBlock;
