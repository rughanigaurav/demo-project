import React from "react";
import RwireInventor from "./rwire-invetor";
import { useState } from "react";
import { getLocalizedValue } from "../../../action/patent-view";

function RwirePatentInfoInventor(props) {
  const { row } = props;
  const [inventorToggle, setInventorToggle] = useState(false);
  const handleInventorToggle = (e) => {
    setInventorToggle(!inventorToggle);
  };

  return (
    <div className="result-page-details d-flex" onClick={handleInventorToggle}>
      <div className="details-header-result font-weight-bold">Inventor:</div>
      <div className="patent-info menu">
        <RwireInventor
          inventor={getLocalizedValue(row._source, "EN", "IN")}
          inventorToggle={inventorToggle}
          setInventorToggle={setInventorToggle}
        />
      </div>
    </div>
  );
}

export default RwirePatentInfoInventor;
