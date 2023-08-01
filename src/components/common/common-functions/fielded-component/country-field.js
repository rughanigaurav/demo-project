import React from "react";
import DropDownCountry from "../rwire-drop-down-date-country";
import RwireFieldedCountryInput from "../rwire-fielded-countryInput";
import Operator from "../rwire-operator-dropdown";

const CountryField = (props) => {
  const {
    index,
    item,
    fieldData,
    setAllField,
    allinputvalue,
    onSetApp,
    onChange,
    onKeyDown,
    countryCondition,
    addFielded,
    onRemoveItem,
    plus,
    minus,
    isCountryInput
  } = props;
  return (
    <div key={index} className="country-section">
      <div className="status-main status-main-overflow status-main-for-input">
        <div title={item.type}>
          <DropDownCountry
            item={item}
            fieldData={fieldData}
            index={index}
            setAllField={setAllField}
            allinputvalue={allinputvalue}
            onSetApp={onSetApp}
          />
        </div>
        <div
          className={`check-status check-status-relative  status-dobule-input country-input country-input_${index}`}
        >
          <RwireFieldedCountryInput
            onChange={onChange}
            onKeyDown={onKeyDown}
            item={item}
            index={index}
            value={item.filedsinput !== " " ? item.filedsinput : ""}
            isCountryInput={isCountryInput}
          />
        </div>
        <div className="country-button-action d-flex justify-content-between">
          <div className="operater-country">
            <Operator
              currentIndex={index}
              onSetField={setAllField}
              fieldData={fieldData}
              onSetApp={onSetApp}
              countryClass={"country-class"}
              item={item}
            />
          </div>
          <div>
            <button
              type="button"
              className={`add-button-county ${
                countryCondition.length > 1 ? "" : "edit-button-add"
              }`}
              onClick={() =>
                addFielded({
                  item: {
                    ...item,
                    filedsinput: "",
                    countryerror: "",
                  },
                  index,
                  fromDate: false,
                })
              }
            >
              <img src={plus} alt="" />
            </button>
          </div>
          {countryCondition.length > 1 ? (
            <div>
              <button
                type="button"
                className="remove-button-county"
                onClick={onRemoveItem}
              >
                <img src={minus} alt="" />
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {item.countryerror ? (
        <div className="countryError">{item.countryerror}</div>
      ) : (
        <div className="countryError"></div>
      )}
    </div>
  );
};

export default CountryField;
