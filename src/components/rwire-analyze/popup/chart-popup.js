import { useEffect, useState } from "react";
import ReactFC from "react-fusioncharts";
import ChartFilterPopup from "../filter/chart-filter-popup";
import TopNumberFilter from "../filter/top-number-filter";
import CombineFields from "../filter/combine-fields";
import Modal from "react-bootstrap/Modal";
import searchData, {
  formatAggregationSingleValueChartData,
  chartAndMergeDataProcess,
  manageExtraNodes,
} from "../../rwire-cognizance/functions/searchAggregationQuery";
import {
  distinctAggQuery,
  aggregationData,
} from "../../rwire-cognizance/functions/aggregationQuery";
import { generateFilterKeysQuery } from "../../rwire-cognizance/functions/chart-functions";
import ChartTypeOptions from "../filter/chart-type-options";
import { getChartSetting } from "../../rwire-cognizance/functions/chart-config";
import ExcludeBlock from "../filter/exclude-in-chart-block";
import ExcludeList from "../filter/exclude-list";
import RWireButton from "../../rwire-ui/rwire-button/rwire-button";
import { useTranslation } from "react-i18next";

const ChartPopup = (props) => {
  const { t } = useTranslation();

  const {
    config,
    isCountryMap,
    isMultiSeries = false,
    chartRowData,
    modalTypeOpen = "filter",
    listMerge,
    chartId,
    isFilterModal,
    onHandleFilter,
    query,
    onApplyFilter,
    field1,
    field2,
    onSetGenerateChart,
    currentSheet,
  } = props;

  const [updateConfig, setUpdateConfig] = useState(config);
  const [chartType, setChartType] = useState(config.type);
  const [chartChangeData, setChartChangeData] = useState(chartRowData);
  const [excludeData, setExcludeData] = useState([]);

  const listFilters = props[currentSheet].listFilters
    ? props[currentSheet].listFilters
    : [];

  const listTopNumbers = props[currentSheet].listTopNumbers
    ? props[currentSheet].listTopNumbers
    : [];

  useEffect(() => {
    let newConfig = {
      ...config,
      width: "90%",
      height: "600",
    };

    setUpdateConfig({ ...newConfig });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let newConfig = {
      ...config,
    };

    setUpdateConfig({ ...newConfig });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.type]);

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
    onSetGenerateChart({
      [currentSheet]: { ...props[currentSheet], listFilters: [] },
    });

    let agg = distinctAggQuery(
      field1,
      field2,
      isMultiSeries,
      listTopNumbers[chartId]
    );

    const chartData = await searchData({ ...query, ...agg });
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
  };

  const handleTopResultSet = async (
    newListMerge = listMerge,
    topNumber = "10"
  ) => {
    let newListTopNumbers = listTopNumbers;

    newListTopNumbers = { ...newListTopNumbers, [chartId]: topNumber };

    onSetGenerateChart({
      [currentSheet]: {
        ...props[currentSheet],
        listTopNumbers: { ...newListTopNumbers },
      },
    });

    let agg = distinctAggQuery(field1, field2, isMultiSeries, topNumber);

    const chartData = await searchData({ ...query, ...agg });
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

        onSetGenerateChart({
          [currentSheet]: {
            ...props[currentSheet],
            listMerge: { ...newListMerge },
          },
        });
      }
    }
  };

  const getResult = async (isForce = false) => {
    if ((listFilters[chartId] && listFilters[chartId].length > 0) || isForce) {
      let agg = distinctAggQuery(
        field1,
        field2,
        isMultiSeries,
        listTopNumbers[chartId]
      );

      let newQuery = "";

      newQuery = JSON.parse(JSON.stringify(query));

      const filterQuery = generateFilterKeysQuery(listFilters[chartId]);

      if (filterQuery.length > 0) {
        newQuery.query.bool.must
          ? newQuery.query.bool.must.push(...filterQuery)
          : (newQuery.query.bool["must"] = [...filterQuery]);
      }

      const chartData = await searchData({ ...newQuery, ...agg });
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

      listFilters[chartId].map(async (item, k) => {
        const filterName = Object.keys(item.selected)[0];
        const aggregation = aggregationData(Object.keys(item.selected)[0]);

        const filterOption = await searchData({
          ...newQuery,
          size: 0,
          ...aggregation,
        });
        let newListFilters = { ...listFilters };

        newListFilters[chartId][k].data = filterOption[filterName].buckets;
        newListFilters[chartId][k].isLoadMore =
          filterOption[filterName].sum_other_doc_count > 0;

        onSetGenerateChart({
          [currentSheet]: {
            ...props[currentSheet],
            listFilters: newListFilters,
          },
        });
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
  };

  const handleApplyFilterButton = () => {
    onSetGenerateChart({
      [currentSheet]: { ...props[currentSheet], ...updateConfig.dataSource },
    });
    onApplyFilter(updateConfig);
    handleClose();
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
                isHideChartOption={true}
                onHandleChartType={handleChartType}
                onHandleClose={handleClose}
                isCountryMap={isCountryMap}
                isMultiSeries={isMultiSeries}
              />
              <div className="d-flex justify-content-end mt-3">
                <CombineFields
                  {...props}
                  updateConfig={updateConfig}
                  mergeData={mergeData}
                  onGetResult={handleTopResultSet}
                  chartId={chartId}
                  onSetGenerateChart={onSetGenerateChart}
                  currentSheet={currentSheet}
                  listMerge={listMerge}
                  listTopNumbers={listTopNumbers}
                  topNumberSize={listTopNumbers[chartId]}
                  onChangeChartDataAsPerMerge={changeChartDataAsPerMerge}
                />
                <TopNumberFilter
                  onHandleTopResultSet={handleTopResultSet}
                  topNumberSize={listTopNumbers[chartId]}
                />
              </div>
            </div>

            <div className="w-100 text-center">
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
