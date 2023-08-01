import React from "react";

function RwireJurisdiction({
  jurisdiction,
  jurisdictionToggle,
  setJurisdictionToggle,
}) {
  return (
    <div className="d-flex justify-content-between cursor-pointer">
      <div>
        {jurisdictionToggle ? jurisdiction.join(" , ") : jurisdiction[0]}
      </div>
      {!jurisdictionToggle && jurisdiction.length > 1 ? (
        <div className="ms-1 inventor"> +{jurisdiction.length - 1}</div>
      ) : null}
    </div>
  );
}

export default RwireJurisdiction;
