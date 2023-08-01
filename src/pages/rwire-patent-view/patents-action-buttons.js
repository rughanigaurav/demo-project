import React from "react";
import { useNavigate } from "react-router-dom";
import { ImArrowRight2, ImArrowLeft2 } from "react-icons/im";
import loading from "../../assets/images/loader.gif";

const PatentsActionButtons = (props) => {
  const { onSetFilter, prevId, nextId, onSetImages } = props;
  const navigate = useNavigate();
  const handlePrevious = () => {
    onSetImages([loading]);
    sessionStorage.setItem("patentId", prevId);
    onSetFilter({ isViewPageModalOpen: false, isSmartReaderOpen: false });
    navigate(`/en/patent-view`);
  };
  const handleNext = () => {
    onSetImages([loading]);
    sessionStorage.setItem("patentId", nextId);
    onSetFilter({ isViewPageModalOpen: false, isSmartReaderOpen: false });
    navigate(`/en/patent-view`);
  };
  return (
    <div className="d-flex gap-3">
      {prevId && (
        <div
          className="d-flex gap-1 align-items-center cursor-pointer"
          title={prevId}
          onClick={handlePrevious}
        >
          <div className="action-arrow">
            <ImArrowLeft2 />
          </div>
          <div className="action-text">Prev</div>
        </div>
      )}
      {nextId && (
        <div
          className="d-flex gap-1 align-items-center cursor-pointer"
          title={nextId}
          onClick={handleNext}
        >
          <div className="action-arrow">
            <ImArrowRight2 />
          </div>
          <div className="action-text">Next</div>
        </div>
      )}
    </div>
  );
};

export default PatentsActionButtons;
