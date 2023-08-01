const getHeightOfChartAsPerScreen = () => {
  let chartHeight = "600";
  if (window && window.innerWidth <= 1280) {
    chartHeight = "250";
  }
  if (
    window &&
    window.innerWidth >= 1281 &&
    window &&
    window.innerWidth <= 1599
  ) {
    chartHeight = "400";
  }
  if (window && window.innerWidth >= 2560) {
    chartHeight = "900";
  }
  return chartHeight;
};

export const initialData = {
  xaxis: "",
  yaxis: "",
  type: "column2d",
  width: "90%",
  height: getHeightOfChartAsPerScreen(),
  dataFormat: "json",
  baseFont: "sans-serif",
  algorithm: "squarified",
  baseFontSize: "10",
  legendItemFontSize: "12",
  yAxisMinValue: 0,
  xAxisName: "xAxisName",
  showLegend: "1",
  yAxisName: "yAxisName",
  theme: "fusion",
  labelDisplay: "1",
  showLabels: "1",
  LegendPosition: "right",
  exportEnabled: "1",
  exportFileName: `test`,
  minimizeTendency: "1",
  showToolTip: "1",
  tooltext: "click exclude data fom chart",
  showMarkerLabels: "1",
  markerBgColor: "#3399FF",
  mapbypercent: "1",
  gradient: "1",
  minvalue: "0",
  code: "e24b1a",
  color: [
    {
      maxvalue: "25",
      code: "070df3",
    },
    {
      maxvalue: "50",
      code: "09c8f5",
    },
    {
      maxvalue: "75",
      code: "e809f5",
    },
    {
      maxvalue: "100",
      code: "62B58F",
    },
  ],
  data: [],
};
