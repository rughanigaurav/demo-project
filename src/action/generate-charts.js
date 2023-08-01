import { getFullName } from "../components/rwire-analyze/drag-container";

export const setGenerateCharts = (payload) => {

    return ({
        type: "GENERATE_CHART_SET",
        payload: {
            ...payload,
        },
    })
};

export const getChartOptions = (options) => {
    return {
        type: options.type,
        width: options.width,
        height: options.height,
        dataFormat: options.dataFormat,
        dataSource: {
            chart: {
                baseFont: options.baseFont,
                algorithm: options.algorithm,
                baseFontSize: options.baseFontSize,
                legendItemFontSize: options.legendItemFontSize,
                yAxisMinValue: options.yAxisMinValue,
                xAxisName: getFullName(options.xaxis),
                showLegend: options.showLegend,
                yAxisName: getFullName(options.yaxis),
                theme: options.theme,
                labelDisplay: options.labelDisplay,
                showLabels: options.showLabels,
                LegendPosition: options.LegendPosition,
                exportEnabled: options.exportEnabled,
                exportFileName: options.exportFileName,
                minimizeTendency: options.minimizeTendency,
                showToolTip: options.showToolTip,
                tooltext: options.tooltext,
                showMarkerLabels: options.showMarkerLabels,
                markerBgColor: options.markerBgColor,
                bgColor: options.bgColor

            },
            colorrange: {
                mapbypercent: options.mapbypercent,
                gradient: options.gradient,
                minvalue: options.minvalue,
                code: options.code,
                color: options.color
            },
            data: options.data,
            dataset: options.dataset,
            categories: options.categories
        },
        events: {
          dataPlotRollOver: function(e) {
            let tooltipBlock = document.getElementById("tooltip-block");

            if(tooltipBlock) {
              let tooltipBlockDetails = `${e.data.displayValue && e.data.displayValue.includes(e.data.categoryLabel) ? e.data.displayValue : `${e.data.categoryLabel}, ${e.data.displayValue}`}`

              tooltipBlock.classList.remove("d-none");

              const leftSpace = (e.data.clientX - ((window.innerWidth - 1140) / 2));
              tooltipBlock.style.left = `${leftSpace - 30}px`;
              tooltipBlock.style.top = `${e.data.clientY - 75}px`;
              document.getElementById("exclude-button").setAttribute('data-index', e.data.dataIndex);
              tooltipBlock.getElementsByClassName("data-value")[0].innerHTML = tooltipBlockDetails;
            }
          },
        }
    }
}
