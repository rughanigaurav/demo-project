import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "../../../assets/css/patent-count.scss";
import RwireAppliedFilters from "../filters/rwire-applied-filters";

const aggrigationNumbersArray = ["MFID", "SFID", "CFID", "DFID", "EFID"];

const getOptions = (data) => {
  const sfCount = data["SFID"] ? data["SFID"].value : 0;
  const mfCount = data["MFID"] ? data["MFID"].value : 0;
  const dfCount = data["DFID"] ? data["DFID"].value : 0;
  const cfCount = data["CFID"] ? data["CFID"].value : 0;
  const efCount = data["EFID"] ? data["EFID"].value : 0;
  const totalCount = sfCount + mfCount + cfCount + dfCount + efCount;
  return {
    options: {
      SFID: (
        <label className="form-check-label family-list">
          Simple Family <span>({sfCount})</span>
        </label>
      ),
      MFID: (
        <label className="form-check-label family-list">
          Main Family <span>({mfCount})</span>
        </label>
      ),
      DFID: (
        <label className="form-check-label family-list">
          Domestic Family <span>({dfCount})</span>
        </label>
      ),
      CFID: (
        <label className="form-check-label family-list">
          Complete Family <span>({cfCount})</span>
        </label>
      ),
      EFID: (
        <label className="form-check-label family-list">
          Extended Family <span> ({efCount})</span>
        </label>
      ),
    },
    totalCount,
  };
};

const RWirePatentsCount = (props) => {
  const {
    onRwireSearchAPI,
    aggregations,
    onSetApp,
    collapsebleFields,
    onSetResultTable,
    onGetFiltersOptions,
    selectedFamily
  } = props;

  const [value, setValue] = useState(collapsebleFields);
  const [selected, setSelectedFamily] = useState(selectedFamily);

  const { options: includeFields } = getOptions(aggregations);

  const handleChange = (event) => {
    onSetResultTable({
      totalRecordsCount: aggregations[event.target.value].value,
      dataFrom: 0,
      activePages: 1,
    });
    setValue(event.target.value);
    onSetApp({ collapsebleFields: event.target.value });
    onRwireSearchAPI("", {
      isReRunId: true,
    });
    onGetFiltersOptions({
      isDisplayListFilters: true,
    });
  };

  const handleSelect = (value) => {
    onSetResultTable({
      totalRecordsCount: aggregations[value].value,
      dataFrom: 0,
      activePages: 1,
      selectedFamily: value
    });
    setSelectedFamily(value);
    setValue(value);
    onSetApp({ collapsebleFields: value });
    onRwireSearchAPI("", {
      isReRunId: true,
    });
    onGetFiltersOptions({
      isDisplayListFilters: true,
    });
  };

  return (
    <div className="mt-1 pt-1 mb-1 filters-section-bg">
      <div className="filter-pub-app-family mt-1">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            value="PN_B"
            onChange={(event) => handleChange(event)}
            checked={value === "PN_B"}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Publication{" "}
            <span>
              ({aggregations["PN_B"] ? aggregations["PN_B"].value : 0})
            </span>
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            value="AN_B"
            onChange={(event) => handleChange(event)}
            checked={value === "AN_B"}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Application{" "}
            <span>
              ({aggregations["AN_B"] ? aggregations["AN_B"].value : 0})
            </span>
          </label>
        </div>
        <div className="form-check family-wrapper">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            value="SFID"
            onChange={(event) => handleChange(event)}
            checked={aggrigationNumbersArray.includes(value)}
          />
          <Dropdown className="" onSelect={handleSelect}>
            <Dropdown.Toggle id="dropdown-basic">
              {selected ? includeFields[selected] : includeFields["SFID"]}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {Object.keys(includeFields).map((item) => {
                return (
                  <div>
                    <Dropdown.Item eventKey={item}>
                      {includeFields[item]}
                    </Dropdown.Item>
                  </div>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div>
        <RwireAppliedFilters {...props} />
      </div>
    </div>
  );
};

export default RWirePatentsCount;
