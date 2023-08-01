import React from "react";
import PatentsActionButtons from "./patents-action-buttons";

const ViewPubNoSection = (props) => {
  const { detailsData, onSetFilter, prevId, nextId, onSetImages } = props;
  return (
    <div className="pub-no d-flex justify-content-between">
      <div className="d-flex">
        <div>{detailsData[`PN_B`]}</div>
        {detailsData.ALD && (
          <>
            <span className="pub-no-dot"></span>
            <div
              className={`${
                detailsData.ALD.toLowerCase() === "dead"
                  ? "pub-status-red"
                  : "pub-status-green"
              }`}
            >
              {detailsData.ALD.toUpperCase()}
            </div>
          </>
        )}
      </div>

      <PatentsActionButtons
        onSetFilter={onSetFilter}
        prevId={prevId}
        nextId={nextId}
        onSetImages={onSetImages}
      />
    </div>
  );
};

export default ViewPubNoSection;
