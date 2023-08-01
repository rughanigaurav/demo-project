import DataChart from "./data-chart";
import { getChartConfig } from "./functions/chart-config";
import { GridItem } from "react-grid-dnd";

const ChartDataBlock = (props) => {
  const {
    item: {
      field1,
      field2,
      type,
      extraChartconfig,
      chartMainTitle,
      id,
      isCountryMap,
      isMultiSeries,
    },
    isDarkMode
  } = props;
  // const store = useStore();
  // const {
  //   chart: { darkTheme },
  // } = store.getState();
  return (
    <GridItem key={id}>
      <DataChart
        {...props}
        field1={field1}
        field2={field2}
        chartConfig={getChartConfig({
          type,
          field1,
          field2,
          isDarkMode,
          ...extraChartconfig,
        })}
        chartMainTitle={chartMainTitle}
        chartId={id}
        isCountryMap={isCountryMap}
        isMultiSeries={isMultiSeries}
      />
    </GridItem>
  );
};

export default ChartDataBlock;
