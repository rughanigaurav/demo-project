import React from "react";

function RwireAssignee({ assignee, assigneeToggle, setAssigneeToggle }) {
  const truncate = (str = "") => {
    if (str.includes(",")) {
      const temp = str.split(",");
      return temp[0] + ".....";
    } else return str;
  };
  return (
    <div className="d-flex justify-content-between">
      <div> {assigneeToggle ? assignee.join(", ") : truncate(assignee[0])}</div>
      {!assigneeToggle && assignee.length > 1 ? (
        <div className="ms-1 inventor"> +{assignee.length - 1}</div>
      ) : null}
    </div>
  );
}

export default RwireAssignee;
