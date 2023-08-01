/* eslint-disable */
import { search } from "../../../service/search";
import { countryCodeList } from "../../../common/country-code-id-list";
import { fieldNameFromShortCode } from "../../../common/field-map";

const commonColorData = (maxValue) => {
    let colorCodeArray = ["7b3893", "43358e", "0096cc", "fabc36", "f15230", "a81e49", "61b147", "d0dd37", "f59b1f", "f05325"]
    let colorArray = [];
    for (let index = 1; index < 11; index++) {
        colorArray.push({
            "maxvalue": index * (maxValue/10) + ((index === 10) ? 1000 : 0),
            "code": colorCodeArray[index - 1]
        });
    }

    return colorArray;
}

const getTreeMapData = (data, field1) => {
    let tempData = [];
    let displayTotal = 0;
    let maxValue = 0;

    data[field1] && data[field1].buckets.forEach((ele, key) => {
        tempData.push({
            label: ele.key_as_string ? `${ele.key_as_string}` : `${ele.key}`,
            value: `${ele.distinct.value}`,
            data: [{
                label: ele.key_as_string ? `${ele.key_as_string}` : `${ele.key}`,
                value: `${ele.distinct.value}`,
                svalue: `${ele.distinct.value}`
            }]
        });

        if(maxValue === 0) {
            maxValue = ele.distinct.value;
        }

        if(ele.distinct.value > maxValue) {
            maxValue = ele.distinct.value;
        }

        displayTotal = displayTotal + ele.distinct.value;
    });

    return {
        colorrange: {
            minvalue: "0",
            code: "e24b1a",
            color: commonColorData(maxValue)
        },
        data: [{
            label: fieldNameFromShortCode(field1),
            value: displayTotal,
            data: tempData
        }]
    };
}

const simpleChartData = (data, field1, field2, type) => {
    let tempData = [];

    data[field1] && data[field1].buckets.forEach((ele, key) => {
        tempData.push({
            label: ele.key_as_string ? `${ele.key_as_string}` : `${ele.key}`,
            value: `${ele.distinct.value}`,
            originalLabel: ele.key_as_string ? `${ele.key_as_string}` : `${ele.key}`
        });

    });

    tempData.sort((a,b) => a.label - b.label);

    return {data: tempData};
}

const multiSeriesChartData = (data, field1) => {
    let category = [];
    let dataset = []

    data[field1] && data[field1].buckets.forEach((ele, key) => {
        let individualData = [];
        if(key === 0) {
            ele.distinct.buckets.forEach((item, k) => {
                category.push({
                    label: `${item.key}`
                })
            });
        }

        ele.distinct.buckets.forEach((item, k) => {
            individualData.push({
                value: item.doc_count,
                key: `${item.key}`
            })
        });

        individualData.sort((a,b) => a.key - b.key)

        dataset.push({
            seriesname: ele.key,
            data: individualData
        })
    });
    category.sort((a,b) => a.label - b.label);

    return { categories: [{ category }], dataset };
}

const heatMapChartData = (data, field1, field2) => {
    let finalData = [];
    let dataSet = [];
    let columnData = [];
    let rowData = [];

    data[field1] && data[field1].buckets.forEach((ele, key) => {

        dataSet.push({
            rowid: ``,
            columnid: `${ele.key}`,
            value: `${ele.distinct.value}`
        })

        columnData.push({
            id: `${ele.key}`,
            label: `${ele.key}`
        });
    });

    rowData.push({
        id: `${field2}`,
        label: `${field2}`
    });

    finalData = {
        data: dataSet,
        rows: {
            row: rowData
        },
        columns: {
            column: columnData
        }
    };

    return {
        dataset: [finalData],
        colorrange: {
          gradient: "1",
          minvalue: "0",
          mapbypercent: "1",
          code: "7da981",
          "color": [
            {
                "code": "6da81e",
                "maxValue": "50"
            },
            {
                "code": "e26860",
                "maxValue": "100"
            }
        ]
        }};
}

const worldCountryChartData = (data, field) => {
    let cData = [];
    let maxValue = 0;

    data[field].buckets.forEach(ele => {
        let temp = {
            id: countryCodeList[`${ele.key.toUpperCase()}`] ? countryCodeList[`${ele.key.toUpperCase()}`] : "0",
            value: ele.doc_count,
            code: ele.key
        }

        if(maxValue === 0) {
            maxValue = ele.doc_count;
        }

        if(ele.doc_count > maxValue) {
            maxValue = ele.doc_count;
        }

        cData.push(temp);
    });

    cData.sort((f, s) => f.label - s.label);

    let bucketsData = data.publicationCountryCount.buckets;
    let publicationCountryData = `EP: ${bucketsData.EP.doc_count} WO: ${bucketsData.WO.doc_count}`;

    return {
        data: cData,
        colorrange: {
            gradient: "1",
            code: "b7ded8",
            color: [
                {
                    "code": "507598",
                    "maxValue": maxValue > 3000 ? maxValue + 1000 : maxValue + 50
                }
            ]
        },
        publicationCountryData
    };
}

const getChartDataOnType = (data, type, field1, field2, isMultiSeries) => {
    switch (type) {
        case "treemap":
            return getTreeMapData(data, field1);

        case "heatmap":
            return heatMapChartData(data, field1, field2);

        case "maps/worldwithcountries":
            return worldCountryChartData(data, field1, field2);

        default:
            return isMultiSeries ? multiSeriesChartData(data, field1, type) : simpleChartData(data, field1, field2, type);
    }

}

export const chartAndMergeDataProcess = (chartData, listMerge) => {

    if(listMerge && listMerge.data) {
    // eslint-disable-next-line array-callback-return
        chartData.data.map((item,k) => {
            // eslint-disable-next-line array-callback-return
            let filterData = listMerge.data.filter(i => (i.label === item.originalLabel) && i.data);
            // eslint-disable-next-line array-callback-return
            filterData && filterData[0] && filterData.map(i => {
                // eslint-disable-next-line array-callback-return
                i.data.map((it, ke) => {

                    let totalValue = i.data.reduce((a, b) => parseInt(a) + parseInt(b.value), 0);
                    let tooltipText = i.data.reduce((a, b) => a +"{br}" + b.label+", "+b.value, "");
                    chartData.data[k].label = i.newLabel ? i.newLabel : i.label;
                    chartData.data[k].value = totalValue;
                    chartData.data[k].tooltext = `${chartData.data[k].label}, ${chartData.data[k].value}{br}{br}${tooltipText}`;

                    if(ke > 0) {
                        const removeIndex = chartData.data.findIndex(x => x.label === it.label);
                        if(removeIndex >= 0) {
                            chartData.data.splice(removeIndex, 1);
                        }
                    }
                })
            })
        })
    };

    return chartData;
}

export const manageExtraNodes = (chartData, listMerge) => {
    if(listMerge && listMerge.data) {
        chartData.data.filter((el, key) => {
            let isFound = listMerge.data.some((f) => {
              return f.label === el.originalLabel
            });

            if(!isFound) {
                listMerge.data.splice(key, 0, el);
            }

            return !isFound;
        });
    }

    return listMerge;
}

export const formatAggregationSingleValueChartData = (data, type, field1, field2, isMultiSeries, listMerge, excludeData = []) => {
    let chartData = [];

    chartData = getChartDataOnType(data, type, field1, field2, isMultiSeries);

    if(excludeData.length > 0) {
        chartData.data = chartData.data && chartData.data.filter((i) => !excludeData.includes(i.label));
    }

    chartData.mergeData = chartData.data;

    chartData = chartAndMergeDataProcess(chartData, listMerge);

    return chartData;
}

const searchData = async (query, field) => {
    const result = await search(JSON.stringify(query), "POST");
    if (result.aggregations) {
        let rData = result.aggregations;
        return rData;
    }
}

export default searchData;
