import React, { useState } from "react";

function PriorityNumberToggle(props) {
  const { priorityNumber } = props;

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="mb-2 ms-4 details d-flex" onClick={handleToggle}>
      <div className="details-header font-weight-bold">Priority Number:</div>
      <div className="ms-5 font-weight-normal">
        {toggle ? (
          <div className="d-flex justify-content-between cursor-pointer">
            <div>{priorityNumber.join(", ")}</div>
          </div>
        ) : (
          <div className="d-flex justify-content-between cursor-pointer">
            <div>{priorityNumber[0]}</div>
            {priorityNumber.length > 1 ? (
              <div className="ms-1 inventor"> +{priorityNumber.length - 1}</div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default PriorityNumberToggle;
