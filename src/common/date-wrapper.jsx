import moment from "moment";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateWrapper = ({
  dates,
  onChange,
  className,
  name,
  onSetDate,
  minDate,
  maxDate,
  isOnlyYear,
  onChangeRaw
}) => {

  const handleChange = (date) => {
    onChange({ ...dates, [name]: date });
    onSetDate({ [name]: moment(date).format(isOnlyYear ? "yyyy" : "yyyy-MM-DD") });
  };

  return (
    <div className={className}>
      <DatePicker
        selected={dates[name]}
        onChange={handleChange}
        placeholderText={isOnlyYear ? "YYYY" : "YYYY-MM-DD"}
        dateFormat={isOnlyYear ? "yyyy" : "yyyy-MM-dd"}
        minDate={minDate}
        maxDate={maxDate}
        showYearPicker={isOnlyYear}
        onChangeRaw={onChangeRaw}
        showMonthDropdown
        showYearDropdown
      />
    </div>
  );
}
export default DateWrapper;
