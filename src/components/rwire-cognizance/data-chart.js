import { useEffect, useState } from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import Powercharts from "fusioncharts/fusioncharts.powercharts";
import TreeCharts from "fusioncharts/fusioncharts.treemap";
import World from "../../lib/chart/fusioncharts.worldwithcountries";
import Maps from "fusioncharts/fusioncharts.maps";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { dFlexAlignCenterJustifyCenter } from "../../common/class-name";
import { formatAggregationSingleValueChartData } from "./functions/searchAggregationQuery";
import filter from "../../images/filter.svg";
import ChartPopup from "./filter/chart-popup";
import closeIcon from "../../images/close-icon-white.svg";
import ChartEditableTitle from "./chart-editable-title";
import { chart_data } from "../constant";
import { displayError } from "../../../src/service/display-error";
import { search } from "../../service/elasticSearch";
charts(FusionCharts);
Powercharts(FusionCharts);
TreeCharts(FusionCharts);
FusionTheme(FusionCharts);
ReactFC.fcRoot(FusionCharts, Maps, World, FusionTheme);

const DataChart = (props) => {
  const {
    field1,
    field2,
    isDarkMode,
    chartList,
    onSetChart,
    chartConfig,
    chartMainTitle,
    isMultiSeries,
    listMerge,
    listTopNumbers,
    chartId,
    onSetIsModelOpen,
  } = props;

  const [config, setConfigs] = useState(chartConfig);
  const [isLoading, setLoading] = useState(true);
  const [chartData, setChartData] = useState();
  const [modalTypeOpen, setModalTypeOpen] = useState();
  // eslint-disable-next-line
  const [chartTitle, setChartTitle] = useState(chartMainTitle);
  const [isFilterModal, setIsFilterModal] = useState(false);

  const handleChartCardDoubleClick = () => {
    handleFilter();
  };

  useEffect(() => {
    setChartTitle(chartMainTitle);
  }, [chartMainTitle]);

  useEffect(() => {
    setLoading(true);

    setConfigs(chartConfig);
    getResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field1, field2, isDarkMode]);

  const handleFilter = () => {
    setIsFilterModal(!isFilterModal);
    setModalTypeOpen("filter");
    onSetIsModelOpen(true);
  };
  async function getResult() {
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

        setConfigs(config);
        setLoading(false);
      }
    } catch (error) {
      displayError(error);
    }
  }

  if (isLoading) {
    return (
      <>
        <div className="column">
          <div className="chart-card">
            <span className={`p-5 ${dFlexAlignCenterJustifyCenter}`}>
              Loading...
            </span>
          </div>
        </div>
      </>
    );
  }

  const onApplyFilter = (updateConfig) => {
    updateConfig.dataSource.chart.showLegend = "0";
    updateConfig.dataSource.chart.caption = "";
    updateConfig.dataSource.chart.subCaption = "";

    setConfigs({ ...updateConfig, width: "90%", height: "300" });
  };

  const handleRemove = () => {
    let newChartList = [];

    // eslint-disable-next-line array-callback-return
    chartList.map((item) => {
      if (item.id === chartId) {
        item.isDelete = true;
      }

      newChartList.push(item);
    });

    onSetChart({ chartList: [...newChartList] });
  };
  // debugger;

  return (
    <>
      <div className="column">
        <div className="chart-card" onDoubleClick={handleChartCardDoubleClick}>
          <div className="chart-header p-2">
            <div className="chart-title m-0">
              <div className="d-flex justify-content-between text-nowrap">
                <ChartEditableTitle
                  onSetChart={onSetChart}
                  chartTitle={chartTitle}
                  chartId={chartId}
                  chartList={chartList}
                />
                <div>
                  <img
                    className="cursor-pointer closebtn"
                    src={closeIcon}
                    alt=""
                    onClick={handleRemove}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="chart-filter">
            <span className="filters">
              <img
                className="width-25"
                alt=""
                src={filter}
                onClick={handleFilter}
              />
            </span>
          </div>
          <div className="p-2">
            <ReactFC {...config} />
          </div>
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
        onSetIsModelOpen={onSetIsModelOpen}
        {...props}
      />
    </>
  );
};

export default DataChart;
