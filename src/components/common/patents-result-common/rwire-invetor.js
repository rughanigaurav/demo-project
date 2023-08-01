import React from "react";

function RwireInventor({ inventor, inventorToggle, setInventorToggle }) {
  const truncate = (str = "") => {
    if (str.includes("|")) {
      const temp = str.split(" | ");
      return temp[0];
    } else return str;
  };

  return (
    <>
      {inventor && (
        <div
          className="d-flex justify-content-between"
          style={{ cursor: "pointer" }}
        >
          <div>
            {inventorToggle
              ? inventor.join(" | ")
              : truncate(inventor.join(" | "))}
          </div>
          {!inventorToggle && inventor.length > 1 ? (
            <div className="ms-1 inventor"> +{inventor.length - 1}</div>
          ) : null}
        </div>
      )}
    </>
  );
}

export default RwireInventor;
