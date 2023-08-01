import React, { useState } from "react";
import RwireJurisdiction from "./rwire-jurisdiction";
import { getFormatizedValue } from "../../../action/patent-view";

const RwirePriorityNumber = (props) => {
  const { row } = props;
  const [jurisdictionToggle, setJurisdictionToggle] = useState(false);

  const handleJurisdictionToggle = (e) => {
    setJurisdictionToggle(!jurisdictionToggle);
  };
  return (
    <div
      className="result-page-details d-flex"
      onClick={handleJurisdictionToggle}
    >
      <div className="details-header-result font-weight-bold">
        Priority Number:
      </div>
      <div className="patent-info">
        <RwireJurisdiction
          jurisdiction={getFormatizedValue(row._source, "PRN")}
          jurisdictionToggle={jurisdictionToggle}
          setJurisdictionToggle={setJurisdictionToggle}
        />
      </div>
    </div>
  );
};

export default RwirePriorityNumber;
