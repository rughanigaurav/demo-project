import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaHighlighter } from "react-icons/fa";
const HighlightColorBox = (props) => {
  const { onClick, onClose, selection, isOpenInModal } = props;
  const [showTooltip, setShowTooltip] = useState(false);
  const colorPallets = [
    "#FF6900",
    "#FCB900",
    "#7BDCB5",
    "#00D084",
    "#8ED1FC",
    "#EB144C",
    "#F78DA7",
    "#9900EF",
  ];
  useEffect(() => {
    setShowTooltip(false);
  }, [selection]);
  const handleButtonClick = () => {
    setShowTooltip(!showTooltip);
  };

  const handleHighlights = (color) => {
    onClick(color);
    onClose();
  };
  const tooltip = (
    <Tooltip
      id="tooltip"
      className={`highlight-tooltip ms-2 ${
        !isOpenInModal ? "tooltip-in-view" : ""
      }`}
    >
      <div
        className="d-flex justify-content-start flex-wrap gap-1 inner-box"
        id="annote-icon"
      >
        {colorPallets.map((color) => (
          <button
            className="unselectable"
            style={{
              backgroundColor: color,
            }}
            onClick={() => handleHighlights(color)}
          />
        ))}
      </div>
    </Tooltip>
  );
  return (
    <>
      <OverlayTrigger
        placement="right"
        trigger="click"
        overlay={tooltip}
        show={showTooltip}
        rootClose
        onHide={() => setShowTooltip(false)}
      >
        <div
          id="annote-icon"
          className="unselectable cursor-pointer"
          title="Highlight the Selection"
          onClick={handleButtonClick}
        >
          <FaHighlighter className="annotations-icons" />
        </div>
      </OverlayTrigger>
    </>
  );
};

export default HighlightColorBox;
