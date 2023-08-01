import React from "react";

const RwirePatentInfoMicroDiv = (props) => {
  const { headerText = "", text = "" } = props;
  return (
    <div className="result-page-details d-flex">
      <div className="details-header-result font-weight-bold">{headerText}</div>
      <div className="patent-info">
        {Array.isArray(text) ? [...new Set(text)].join(", ") : text}
      </div>
    </div>
  );
};

export default RwirePatentInfoMicroDiv;
