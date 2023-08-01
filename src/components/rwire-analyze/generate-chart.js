import ChartBlock from "./chart-block";
import { getChartOptions } from "../../action/generate-charts";
import { getFullName } from "./drag-container";

const GenerateChart = (props) => {
  const { currentSheet } = props;

  const field1 = props[currentSheet] && props[currentSheet].xaxis;
  const field2 = props[currentSheet] && props[currentSheet].yaxis;

  if (!field1 || !field2) {
    return null;
  }

  return (
    <ChartBlock
      {...props}
      field1={field1}
      field2={field2}
      chartConfig={getChartOptions(props[currentSheet])}
      chartMainTitle={`${getFullName(field1)} vs ${getFullName(field2)}`}
      chartId={`${field1}-${field2}`}
    />
  );
};

export default GenerateChart;
