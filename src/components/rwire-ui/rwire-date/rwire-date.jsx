import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import { useSelector, useDispatch } from "react-redux";
import { MAX_EXPIRE_DATE } from "../../constant";
import "../../../assets/css/style.scss";
import { setApp } from "../../../action/app.js";

const RenderCustomHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  years,
  showYearPicker,
  handleSelectedYear,
  selectedYear,
}) => {
  const yearOptions = [5, 10, 15, 20];
  return (
    <div>
      <div className="select-year">
        <label>Last Year</label>
        {yearOptions.map((option) => (
          <button
            key={option}
            className={`${selectedYear === option ? "selected" : ""}`}
            onClick={() => handleSelectedYear(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div
        style={{
          margin: "10px auto",
          display: "flex",
          justifyContent: "center",
          width: "200px",
        }}
      >
        <div className="year-dd">
          <button
            className={`${showYearPicker ? "hide-btn" : ""}`}
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
          >
            {"<"}
          </button>
          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
            className={`${showYearPicker ? "hide-btn" : ""}`}
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className={`${showYearPicker ? "hide-btn" : ""}`}
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const range = (start, end) => {
  return new Array(end - start).fill().map((d, i) => i + start);
};

const getYearList = (isExipryDate) => {
  if (isExipryDate) {
    return range(1785, getYear(new Date(MAX_EXPIRE_DATE)) + 1, 1);
  }
  return range(1785, getYear(new Date()) + 1, 1);
};

const DateField = (props) => {
  const {
    onSetValue,
    selectedValue,
    maxDate,
    placeholderText,
    dateFormat,
    showYearPicker,
    isExpiryDate,
    onHandleRangeDate,
  } = props;

  const selectedYear = useSelector((state) => state.app.selectedYear);
  const dispatch = useDispatch();
  let datePickerRef = null;

  const handleSelectDate = (value) => {
    onSetValue(value);
  };
  const years = getYearList(isExpiryDate);

  const handleSelectedYear = (years) => {
    const currentDate = new Date();
    const newDate = new Date(currentDate);
    newDate.setFullYear(currentDate.getFullYear() - years);
    onHandleRangeDate(newDate, currentDate);
    dispatch(setApp({ selectedYear: years }));
    datePickerRef.setOpen(false);
  };

  return (
    <div>
      <DatePicker
        className="date-search"
        ref={(ref) => (datePickerRef = ref)}
        placeholderText={placeholderText}
        dateFormat={dateFormat}
        selected={selectedValue ? selectedValue : null}
        onChange={handleSelectDate}
        popperPlacement="bottom-start"
        maxDate={maxDate}
        showYearPicker={showYearPicker}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) =>
          RenderCustomHeader({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
            years,
            showYearPicker,
            handleSelectedYear,
            selectedYear,
          })
        }
      />
      {!selectedValue && (
        <style>
          {`.select-year button.selected {
              background-color: #ffffff;
              color: black;
            }
            .dark-mode .select-year button.selected {
              background-color: unset !important;
              background-color: #ffffff !important;
              color: black !important;
            }
          `}
        </style>
      )}
    </div>
  );
};

export default DateField;
