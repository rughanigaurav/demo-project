import React from "react";
import RwireLeft from "./rwire-left";
import RwireRight from "./rwire-right";

function RwireModalBody(props) {
  return (
    <div className="body-section d-flex justify-content-between">
      <RwireLeft {...props} />
      <RwireRight {...props} />
    </div>
  );
}

export default RwireModalBody;
