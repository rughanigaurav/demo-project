import React from "react";
import { useState } from "react";
import RwireAssignee from "./rwire-assignee";
import { getLocalizedValue } from "../../../action/patent-view";

function RwirePatentInfoAssignee(props) {
  const { row } = props;
  const [assigneeToggle, setAssigneeToggle] = useState(false);
  const handleAssigneeToggle = (e) => {
    setAssigneeToggle(!assigneeToggle);
  };
  return (
    <div className="result-page-details d-flex" onClick={handleAssigneeToggle}>
      <div className="details-header-result font-weight-bold">
        Current Assignee:
      </div>
      <div className="patent-info menu">
        <RwireAssignee
          assignee={getLocalizedValue(row._source, "EN", "CA")}
          assigneeToggle={assigneeToggle}
          setAssigneeToggle={setAssigneeToggle}
        />
      </div>
    </div>
  );
}

export default RwirePatentInfoAssignee;
