import DropDownDate from "../rwire-drop-down-date";
import Operator from "../rwire-operator-dropdown";
import RwireDatePicker from "../../../rwire-ui/rwire-date";
import RWIRE_IMAGES from "../../common-functions/rwire-images";
import { useState } from "react";
import {
  checkValidation,
  getDateFiedsOptions,
} from "../../../../common/date-validation";
import "./fielded.scss";

const DateField = (props) => {
  const {
    item,
    fieldData,
    index,
    setAllField,
    allinputvalue,
    onSetApp,
    addFielded,
    handleRemoveItem,
    plus,
    minus,
    dateFields,
    queryValue,
  } = props;

  // eslint-disable-next-line no-unused-vars
  const [showCancel, setCancel] = useState(false);
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState();

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (!startdate && !enddate) {
  //       const clearData = clearFielded(fieldData);
  //       setAllField({ queryFields: clearData });
  //     }
  //   }, 100);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [startdate, enddate]);

  const handleStartDate = async (value) => {
    setStartDate(value);
    const dateData = fieldData.map((i, key) => {
      if (index === key) {
        return {
          ...i,
          startdate: value,
        };
      }
      return { ...i };
    });
    await setAllField({ queryFields: dateData });
    await onSetApp({ smartSearchWord: "", isUpdateQuery: false });

    //We passed start and end date because after state set it's not found imediatlly
    const validData = await checkValidation({
      startDate: value,
      endDate: enddate,
      data: dateData,
      index,
    });
    await setAllField({ queryFields: validData });
  };

  const handleEndDate = async (value) => {
    const endDateDate = fieldData.map((i, key) => {
      if (index === key) {
        return { ...i, enddate: value };
      }
      return { ...i };
    });
    setAllField({ queryFields: endDateDate });
    onSetApp({ smartSearchWord: "", isUpdateQuery: false });
    setEndDate(value);

    //We passed start and end date because after state set it's not found imediatlly
    const validData = await checkValidation({
      startDate: startdate,
      endDate: value,
      data: endDateDate,
      index,
    });
    await setAllField({ queryFields: validData });
    setCancel(true);
  };

  const handleRangeDate = async (startDate, endDate) => {
    const dates = fieldData.map((i, key) => {
      if (index === key) {
        return { ...i, startdate: startDate, enddate: endDate };
      }
      return { ...i };
    });
    setAllField({ queryFields: dates });
    onSetApp({ smartSearchWord: "", isUpdateQuery: false });
    setStartDate(startDate);
    setEndDate(endDate);

    setCancel(true);
  };

  const { maxDate, placeholder, dateFormat, showYearPicker, isExpiryDate } =
    getDateFiedsOptions(queryValue);

  return (
    <div className="date-section">
      <div className="status-main status-main-for-input">
        <div title={item.type}>
          <DropDownDate
            item={item}
            fieldData={fieldData}
            index={index}
            setAllField={setAllField}
            allinputvalue={allinputvalue}
            onSetApp={onSetApp}
            startDate={startdate}
            endDate={enddate}
          />
        </div>
        <div className="date-check check-status status-dobule-input">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <RwireDatePicker
                className="date-search"
                placeholderText={placeholder}
                dateFormat={dateFormat}
                onHandleRangeDate={(startDate, endDate) =>
                  handleRangeDate(startDate, endDate)
                }
                onSetValue={(value) => handleStartDate(value)}
                selectedValue={item.startdate}
                maxDate={maxDate}
                showYearPicker={showYearPicker}
                isExpiryDate={isExpiryDate}
              />
            </div>
            {item.startdate && (
              <img
                className="close-button"
                src={RWIRE_IMAGES.RwireCloseIcon}
                onClick={() => handleStartDate("")}
                alt=""
              />
            )}
            <div className="date-center-to">
              <span className="to-date">TO</span>
            </div>
            <div>
              <RwireDatePicker
                className="date-search"
                placeholderText={placeholder}
                dateFormat={dateFormat}
                onHandleRangeDate={(startDate, endDate) =>
                  handleRangeDate(startDate, endDate)
                }
                onSetValue={(value) => handleEndDate(value)}
                selectedValue={item.enddate}
                maxDate={maxDate}
                showYearPicker={showYearPicker}
                isExpiryDate={isExpiryDate}
              />
            </div>
            {item.enddate && (
              <img
                className="close-button last"
                src={RWIRE_IMAGES.RwireCloseIcon}
                onClick={() => handleEndDate("")}
                alt=""
              />
            )}
          </div>
        </div>
        <Operator
          currentIndex={index}
          onSetField={setAllField}
          fieldData={fieldData}
          onSetApp={onSetApp}
        />
        <button
          type="button"
          className={`status-button status-plus curb-border ${
            dateFields.length > 3 ? "disabled" : ""
          } `}
          onClick={() =>
            addFielded({
              item: { ...item },
              index: index,
              fromDate: true,
            })
          }>
          <img src={plus} alt="" />
        </button>
        <button
          type="button"
          className={`status-button status-plus radius-minus date-field ${
            dateFields.length > 1 ? "show-minus" : ""
          }`}
          onClick={() => handleRemoveItem(item.id)}>
          <img src={minus} alt="" />
        </button>
      </div>
      <div className="date-section-filed">
        {item.startdate && item.enddate && item.fielderror ? (
          <div className="dateError">{item.fielderror}</div>
        ) : null}
      </div>
    </div>
  );
};

export default DateField;
