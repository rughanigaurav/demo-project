import { fieldNameFromShortCode } from "../../../common/field-map";

const isMultiPaletteColorsOnChart = [
  "pie2D",
  "pie3d",
  "doughnut2D",
  "doughnut3d",
  "msline",
  "mscolumn2d",
  "mscolumn3d",
  "msbar2d",
  "msbar3d",
  "mssplinearea",
];

const isNotLabelShow = [
  "pie2D",
  "pie3d",
  "doughnut2D",
  "doughnut3d",
  "maps/worldwithcountries",
];

const colorsList = [
  "5d62b5",
  "f2726f",
  "4cc3be",
  "bc95df",
  "62b58f",
  "f9c534",
  "a534f9",
  "b35454",
  "e57bbe",
  "c25fdd",
  "876ee2",
  "5c5bb3",
  "6c8ae5",
  "6ac1d2",
  "63bf90",
  "749d53",
  "afd65c",
  "ddb55f",
  "9c7540",
  "cb5c48",
  "ff6b6b",
  "ff80ed",
  "065535",
  "133337",
  "ffc0cb",
  "008080",
  "00ffff",
  "0000ff",
  "40e0d0",
  "c6e2ff",
  "666666",
  "faebd7",
  "bada55",
  "003366",
  "c0c0c0",
  "800000",
  "800080",
  "c39797",
  "cccccc",
  "20b2aa",
  "fff68f",
  "333333",
  "ffc3a0",
  "c0d6e4",
  "ff7f50",
  "468499",
  "008000",
  "0e2f44",
  "990000",
  "daa520",
  "088da5",
  "0a75ad",
  "ff4040",
  "420420",
];

const getHeightOfChartAsPerScreen = () => {
  let chartHeight = "300";

  if (window && window.innerWidth <= 1280) {
    chartHeight = "250";
  }
  return chartHeight;
};
export const getChartSetting = (type) => {
  let chartOptions = {
    showLabels: "1",
    paletteColors: "5d62b5",
  };

  if (isMultiPaletteColorsOnChart.includes(type)) {
    chartOptions = { ...chartOptions, paletteColors: colorsList.join(",") };
  }

  if (isNotLabelShow.includes(type)) {
    chartOptions = { ...chartOptions, showLabels: "0" };
  }

  return chartOptions;
};

export const getChartConfig = ({
  type,
  field1,
  field2,
  width = "90%",
  height = getHeightOfChartAsPerScreen(),
  showLabels = "1",
  showLegend = "0",
  labelDisplay = "rotate",
  LegendPosition = "right",
  exportEnabled = "1",
  xAxisName = fieldNameFromShortCode(field1),
  yAxisName = fieldNameFromShortCode(field2),
  chartTitle = "",
  data = {},
  mergeData = {},
  dataset,
  categories,
  colorrange = {},
  publicationCountryData = "",
  markers,
  isDarkMode,
}) => {
  // const isDarkMode = useSelector((state) => state.app.darkTheme);
  const chartBackgroundColor = isDarkMode ? "#121212" : "#ffffff";
  return {
    type,
    width,
    height,
    dataFormat: "json",
    dataSource: {
      chart: {
        baseFont: "sans-serif",
        algorithm: "squarified",
        baseFontSize: "10",
        legendItemFontSize: "12",
        caption: chartTitle,
        subCaption: publicationCountryData,
        subCaptionFontSize: "30",
        subCaptionFontBold: "1",
        yAxisMinValue: 0,
        xAxisName,
        showLegend,
        yAxisName,
        theme: "fusion",
        bgColor: chartBackgroundColor,
        labelDisplay,
        showLabels,
        LegendPosition,
        exportEnabled,
        exportFileName: `${fieldNameFromShortCode(
          field1
        )}-${fieldNameFromShortCode(field2)}`,
        minimizeTendency: "1",
        showToolTip: "1",
        tooltext: "click exclude data fom chart",
        showMarkerLabels: "1",
        markerBgColor: "#000000",
        ...getChartSetting(type),
      },
      colorrange: colorrange
        ? colorrange
        : {
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
          },
      data,
      mergeData,
      dataset,
      categories,
      publicationCountryData,
      markers,
    },
    events: {
      dataPlotRollOver: function (e) {
        let tooltipBlock = document.getElementById("tooltip-block");

        if (tooltipBlock) {
          let tooltipBlockDetails = `${
            e.data.displayValue &&
            e.data.displayValue.includes(e.data.categoryLabel)
              ? e.data.displayValue
              : `${e.data.categoryLabel}, ${e.data.displayValue}`
          }`;

          tooltipBlock.classList.remove("d-none");

          const leftSpace = e.data.clientX - (window.innerWidth - 1140) / 2;
          tooltipBlock.style.left = `${leftSpace - 30}px`;
          tooltipBlock.style.top = `${e.data.clientY - 75}px`;
          document
            .getElementById("exclude-button")
            .setAttribute("data-index", e.data.dataIndex);
          tooltipBlock.getElementsByClassName("data-value")[0].innerHTML =
            tooltipBlockDetails;
        }
      },
    },
  };
};
