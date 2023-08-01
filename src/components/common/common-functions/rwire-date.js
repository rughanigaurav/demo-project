import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DropDown from "./rwire-drop-down-date";
import "rsuite/dist/rsuite.min.css";
import moment from "moment";
export default function RWireDate(props) {
  const { plus, minus, fieldData, setDateField } = props;

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  let nextId = fieldData.length;

  const handleRemoveItem = (id) => {
    setDateField(fieldData.filter((item) => item.id !== id));
  };

  const addFielded = (item, id, index) => {
    item.id = nextId;
    fieldData.splice(index, 0, item);
    setDateField([...fieldData]);
  };

  const handleSelect = (eventKey, index) => {
    fieldData.forEach((item, key) => {
      if (index === key) {
        item.operatersvalue = eventKey.target.value;
      }
    });
    setDateField([...fieldData]);
  };

  const handleEndDate = (event, index) => {
    const endDate = moment(event).format("YYYY-MM-DD");
    fieldData.forEach((item, key) => {
      if (index === key) {
        item.enddate = endDate.replace(/-/g, "");
      }
    });
    setDateField([...fieldData]);
    setEndDate(event);
  };

  const handleStartDate = (event, index) => {
    const startDate = moment(event).format("YYYY-MM-DD");
    fieldData.forEach((item, key) => {
      if (index === key) {
        item.startdate = startDate.replace(/-/g, "");
      }
    });
    setDateField([...fieldData]);
    setStartDate(event);
  };

  return (
    <>
      {fieldData.map((item, index) => {
        return (
          <div className="status-state-type-pub" key={item.id}>
            <div className="status-main status-main-for-input">
              <select
                className="status-button select-and operater-select"
                onChange={(event) => handleSelect(event, index)}
              >
                {item.operaters.map((optionData, index) => {
                  return <option key={index}>{optionData.valuecode}</option>;
                })}
              </select>
              <DropDown
                item={item}
                fieldData={fieldData}
                index={index}
                setAllField={setDateField}
              />
              <div className="check-status status-dobule-input">
                <DatePicker
                  isClearable
                  className="date-search"
                  placeholderText="YYYY-MM-DD"
                  dateFormat="yyyy/MM/dd"
                  selected={startDate}
                  onChange={(event) => handleStartDate(event, index)}
                />
                <span className="to-date">to</span>
                <DatePicker
                  isClearable
                  className="date-search"
                  dateFormat="yyyy/MM/dd"
                  placeholderText="YYYY-MM-DD"
                  selected={endDate}
                  onChange={(event) => handleEndDate(event, index)}
                />
              </div>
              <button
                type="button"
                className="status-button status-plus"
                onClick={() => {
                  addFielded({ ...item }, { id: nextId++ }, index);
                }}
              >
                <img src={plus} alt="" />
              </button>
              <button
                type="button"
                className="status-button status-plus radius-minus"
                onClick={() => {
                  handleRemoveItem(item.id);
                }}
              >
                <img src={minus} alt="" />
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
