import { useState } from "react";
import MergeRow from "./merge-row";
import RWireButton from "../../rwire-ui/rwire-button/rwire-button";
import { useTranslation } from "react-i18next";

const MergeBlock = (props) => {
  const { t } = useTranslation();
  const {
    mergeData = [],
    onGetResult,
    onSetChart,
    listMerge,
    listTopNumbers,
    chartId,
    topNumberSize,
    onChangeChartDataAsPerMerge,
  } = props;
  const [selectData, setSelectData] = useState([]);
  const listMergeData = listMerge[chartId]
    ? listMerge[chartId].data
    : mergeData;

  const handleSelect = (value) => {
    const indexValue = selectData.indexOf(value);
    if (indexValue === -1) {
      selectData.push(value);
    } else {
      selectData.splice(indexValue, 1);
    }

    setSelectData([...selectData]);
  };

  const handleMerge = () => {
    if (selectData.length > 0) {
      let totalRecord =
        (topNumberSize ? parseInt(topNumberSize) : 10) + selectData.length - 1;

      let newListTopNumbers = listTopNumbers;
      newListTopNumbers = { ...newListTopNumbers, [chartId]: totalRecord };

      onSetChart({ listTopNumbers: newListTopNumbers });

      let newMergeData = [];
      let filterMergeData = [];
      let insertDataPosition = null;

      let labelOfMerge = "";
      // eslint-disable-next-line array-callback-return
      listMergeData.map((item, key) => {
        if (selectData.includes(item.label)) {
          if (!labelOfMerge) {
            labelOfMerge = item.newLabel ? item.newLabel : item.label;
          }

          if (item.data) {
            filterMergeData.push(...item.data);
          } else {
            filterMergeData.push(item);
          }

          if (insertDataPosition === null) {
            insertDataPosition = key;
          }
        } else {
          newMergeData.push(item);
        }
      });

      newMergeData.splice(insertDataPosition, 0, {
        label: labelOfMerge,
        data: filterMergeData,
      });

      setSelectData([]);

      let newListMerge = { ...listMerge };

      newListMerge[chartId] = {
        data: [...newMergeData],
      };

      onSetChart({ listMerge: { ...newListMerge } });

      onGetResult(newListMerge);
    }
  };

  return (
    <div className="d-flex text-start merge-block mt-2 p-2">
      <div className="w-100">
        <div className="merge-row-block">
          {listMergeData.map((item, key) => {
            return (
              <MergeRow
                id={key}
                item={item}
                listMerge={listMerge}
                chartId={chartId}
                onSelect={handleSelect}
                selectData={selectData}
                listMergeData={listMergeData}
                onSetChart={onSetChart}
                onGetResult={onGetResult}
                onChangeChartDataAsPerMerge={onChangeChartDataAsPerMerge}
              />
            );
          })}
        </div>
        <RWireButton
          buttonCName={`input-button-text-form normal-button medium-width mt-3 ${
            selectData.length <= 0 ? "disabled" : ""
          }`}
          onClick={handleMerge}
          disabled={selectData.length <= 0}>
          {t("merge_button")}
        </RWireButton>
      </div>
    </div>
  );
};

export default MergeBlock;
