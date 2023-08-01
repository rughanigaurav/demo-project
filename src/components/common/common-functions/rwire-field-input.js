/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { uuidv4 } from "../../../action/app";
import "../../../assets/css/dropdown.scss";
import DateField from "./fielded-component/date-field";
import TextField from "./fielded-component/text-field";
import CountryField from "./fielded-component/country-field";

export default function RWireFieldedInput(props) {
  const {
    fieldData,
    minus,
    plus,
    setAllField,
    allinputvalue,
    onRwireSearchAPI,
    validationQuery,
    searchQuery,
    onSetApp,
    localQuery,
    isEditModalOpen,
    onCloseModal,
  } = props;
  const [dateFields, setDateFields] = useState([]);
  const [countryError, setCountryError] = useState("");
  const navigate = useNavigate();

  const handleRemoveItem = (e) => {
    const filteredItem = fieldData.filter((item) => item.id !== e);

    onSetApp({ smartSearchWord: "", isUpdateQuery: false });
    setAllField({ queryFields: [...filteredItem] });
  };

  const addFielded = ({ item, index, fromDate = false }) => {
    let nextId = uuidv4();
    item.id = nextId;
    fieldData.splice(index + 1, 0, item);
    if (fromDate) {
      fieldData.map((_, key) => {
        if (index + 1 === key) {
          fieldData[key].startdate = "";
          fieldData[key].enddate = "";
          fieldData[key].dateerror = "";
          fieldData[key].fielderror = "";
        }
        return false;
      });
    }

    onSetApp({ smartSearchWord: "", isUpdateQuery: false });
    setAllField({ queryFields: [...fieldData] });
  };

  const handleChange = (event, index, country) => {
    event.preventDefault();
    let value = event.target.value;
    value = country ? value.replace(/[,;|]/g, " OR ") : value;
    const changedFields = fieldData.map((i, k) => {
      if (index === k) {
        return {
          ...i,
          filedsinput: value,
        };
      } else {
        return {
          ...i,
        };
      }
    });
    onSetApp({ smartSearchWord: "", isUpdateQuery: false });
    setAllField({ queryFields: changedFields });
  };

  const queryValidation = () => {
    return validationQuery(searchQuery);
  };

  const handleKeyDown = (event, country) => {
    const alertData = "`~!@#$%&^*_=-[]{}()'+?/:<> Symbols are not permitted";
    if (event.key === "Enter") {
      event.preventDefault();
    }
    if (country) {
      if (
        event.key === "$" ||
        event.key === "^" ||
        event.key === "(" ||
        event.key === ")" ||
        event.key === "+" ||
        event.key === "?" ||
        event.key === "/" ||
        event.key === "*" ||
        event.key === "." ||
        event.key === '"' ||
        event.key === "'" ||
        event.key === "]" ||
        event.key === "[" ||
        event.key === "!" ||
        event.key === "@" ||
        event.key === "#" ||
        event.key === "%" ||
        event.key === "&" ||
        event.key === "-" ||
        event.key === "_" ||
        event.key === "=" ||
        event.key === ":" ||
        event.key === ">" ||
        event.key === "<" ||
        event.key === "{" ||
        event.key === "}" ||
        event.key === "`" ||
        event.key === "~"
      ) {
        event.preventDefault();
        setCountryError(alertData);
      } else {
        setCountryError("");
      }
    }

    if (event.key === "Enter" && queryValidation()) {
      const searchuery = isEditModalOpen ? localQuery : searchQuery;

      onRwireSearchAPI(searchuery).then((data) => {
        if (data) {
          navigate("/en/rwire-patents");
          if (onCloseModal) {
            onCloseModal();
          }
        } else {
          // eslint-disable-next-line no-console
          console.log(props.error);
        }
      });
    }
  };

  var textCondition = fieldData.filter((item) => item.dattype === "Text");
  var countryCondition = fieldData.filter((item) => item.dattype === "Country");

  useEffect(() => {
    const dateFields = fieldData.filter((item) => item.dattype === "Date");
    setDateFields(dateFields);
  }, [fieldData]);

  useEffect(() => {
    countryCondition.map((item, key) => {
      if (item.filedsinput && !item.query) {
        countryCondition[key].countryerror = "Please select country field";
      } else if (item.query && item.filedsinput) {
        countryCondition[key].countryerror = "";
      } else {
        countryCondition[key].countryerror = "";
      }
    });
  }, [countryCondition]);

  return (
    <div>
      {fieldData.map((item, index) => {
        return item.dattype === "Text" ? (
          <TextField
            item={item}
            fieldData={fieldData}
            index={index}
            key={index}
            setAllField={setAllField}
            allinputvalue={allinputvalue}
            onSetApp={onSetApp}
            addFielded={addFielded}
            onRemoveItem={() => handleRemoveItem(item.id)}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            plus={plus}
            minus={minus}
            textCondition={textCondition}
          />
        ) : null;
      })}
      <div className="search-dobule-column">
        <div className="date">
          {fieldData.map((item, index) => {
            if (item.dattype === "Date") {
              return (
                <DateField
                  item={item}
                  fieldData={fieldData}
                  index={index}
                  key={index}
                  setAllField={setAllField}
                  allinputvalue={allinputvalue}
                  onSetApp={onSetApp}
                  addFielded={addFielded}
                  handleRemoveItem={handleRemoveItem}
                  plus={plus}
                  minus={minus}
                  dateFields={dateFields}
                  queryValue={item.query}
                />
              );
            }
          })}
        </div>
        <div className="country">
          {fieldData.map((item, index) => {
            return item.dattype === "Country" ? (
              <CountryField
                item={item}
                fieldData={fieldData}
                index={index}
                key={index}
                setAllField={setAllField}
                allinputvalue={allinputvalue}
                onSetApp={onSetApp}
                addFielded={addFielded}
                onRemoveItem={() => handleRemoveItem(item.id)}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                plus={plus}
                minus={minus}
                countryCondition={countryCondition}
                isCountryInput={true}
              />
            ) : null;
          })}
          {countryError ? (
            <div className="countryError">{countryError}</div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
