import React from "react";
import { useState } from "react";
import RwireJurisdiction from "./rwire-jurisdiction";

function RwirePatentInfoJurisdiction(props) {
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
        Jurisdiction:
      </div>
      <div className="patent-info menu">
        <RwireJurisdiction
          jurisdiction={row._source["DSEP_CST"]}
          jurisdictionToggle={jurisdictionToggle}
          setJurisdictionToggle={setJurisdictionToggle}
        />
      </div>
    </div>
  );
}

export default RwirePatentInfoJurisdiction;
