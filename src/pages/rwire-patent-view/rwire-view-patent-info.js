import React from "react";
import moment from "moment";
import PriorityNumberToggle from "./priority-number-toggle";
import RwireJurisdiction from "../../components/common/patents-result-common/rwire-jurisdiction";
import { useState } from "react";

function RwireViewPatentInfo(props) {
  const {
    assigneeName = [],
    inventorName,
    jurisdiction1 = [],
    jurisdiction2,
    jurisdiction3,
    jurisdiction4,
    jurisdiction5,
    jurisdiction6,
    jurisdiction7,
    jurisdiction8,
    jurisdiction9,
    applNumber,
    legalStatus = "",
    pubDate,
    applDate,
    priority,
    expDate,
    priorityNumber,
  } = props;

  const [jurisdictionToggle, setJurisdictionToggle] = useState(false);

  const handleJurisdictionToggle = (e) => {
    setJurisdictionToggle(!jurisdictionToggle);
  };

  return (
    <div className="patent-info-block d-flex flex-column">
      <div className="mb-2 ms-4 details d-flex">
        <div className="details-header font-weight-bold">Current Assignee:</div>
        <div className="ms-5 font-weight-normal">
          {assigneeName && assigneeName.join(", ")}
        </div>
      </div>
      <div className="mb-2 ms-4 details d-flex">
        <div className="details-header font-weight-bold">Inventor:</div>
        <div className="ms-5 font-weight-normal" style={{ color: "#0048A2" }}>
          {inventorName && <div>{inventorName.join(" | ")}</div>}
        </div>
      </div>
      <div
        className="mb-2 ms-4 details d-flex"
        onClick={handleJurisdictionToggle}
      >
        <div className="details-header font-weight-bold">Jurisdiction:</div>
        <div className="ms-5 font-weight-normal">
          <RwireJurisdiction
            jurisdiction={jurisdiction1.concat(
              jurisdiction2,
              jurisdiction3,
              jurisdiction4,
              jurisdiction5,
              jurisdiction6,
              jurisdiction7,
              jurisdiction8,
              jurisdiction9
            )}
            jurisdictionToggle={jurisdictionToggle}
            setJurisdictionToggle={setJurisdictionToggle}
          />
        </div>
      </div>
      <div className="mb-2 ms-4 details d-flex">
        <div className="details-header font-weight-bold">
          Application Number:
        </div>
        <div className="ms-5 font-weight-normal">{applNumber}</div>
      </div>
      <div className="mb-2 ms-4 details d-flex">
        <div className="details-header font-weight-bold">Legal Status:</div>
        <div className="ms-5 font-weight-normal">
          {legalStatus ? legalStatus : ""}
        </div>
      </div>
      <div className="mb-2 ms-4 details d-flex">
        <div className="details-header font-weight-bold">Publication Date:</div>
        <div className="ms-5 font-weight-normal">
          {pubDate && moment(pubDate).format("LL")}
        </div>
      </div>
      <div className="mb-2 ms-4 details d-flex">
        <div className="details-header font-weight-bold">Application Date:</div>
        <div className="ms-5 font-weight-normal">
          {applDate && moment(applDate).format("LL")}
        </div>
      </div>
      <div className="mb-2 ms-4 details d-flex">
        <div className="details-header font-weight-bold">
          Earliest Priority Date:
        </div>
        <div className="ms-5 font-weight-normal">
          {priority && moment(priority).format("LL")}
        </div>
      </div>
      <PriorityNumberToggle priorityNumber={priorityNumber} />
      <div className="mb-2 ms-4 details d-flex">
        <div className="details-header font-weight-bold">Expiry Date:</div>
        <div className="ms-5 font-weight-normal">
          {expDate ? moment(expDate).format("LL") : ""}
        </div>
      </div>
    </div>
  );
}

export default RwireViewPatentInfo;
