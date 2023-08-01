import { useState } from "react";

const ChartEditableTitle = (props) => {
  const { chartTitle, chartList, chartId, onSetChart } = props;

  const [isEdit, setIsEdit] = useState(false);
  const [isError, setIsError] = useState(false);
  const [value, setValue] = useState(chartTitle);

  const handleClick = () => {
    setIsEdit(true);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    if (value) {
      // eslint-disable-next-line array-callback-return
      chartList.map((i, k) => {
        if (i.id === chartId) {
          chartList[k].chartMainTitle = value;
        }
      });

      onSetChart({ chartList: [...chartList] });
      setIsEdit(false);
      setIsError(false);
    } else {
      setIsEdit(false);
      setValue(chartTitle);
      setIsError(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      if (value) {
        // eslint-disable-next-line array-callback-return
        chartList.map((i, k) => {
          if (i.id === chartId) {
            chartList[k].chartMainTitle = value;
          }
        });

        onSetChart({ chartList: [...chartList] });
        setIsEdit(false);
        setIsError(false);
      } else {
        setIsEdit(false);
        setValue(chartTitle);
        setIsError(true);
      }
    }
  };

  return (
    <div>
      {isEdit ? (
        <div>
          <input
            autoFocus
            type="text"
            className={`chart-title-input ${isError ? "title-error" : ""}`}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
        </div>
      ) : (
        <div className="chart-title-heading" onClick={handleClick}>{chartTitle}</div>
      )}
    </div>
  );
};

export default ChartEditableTitle;
