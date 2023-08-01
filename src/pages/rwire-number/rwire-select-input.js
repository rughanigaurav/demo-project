import React, { useEffect, useRef, useState } from "react";
import ArrowDownIcon from "@rsuite/icons/ArrowDown";
import CloseIcon from "@rsuite/icons/Close";

export const RwireSelectInput = (props) => {
  const { data, onSelect, selected } = props;
  const [showDropdown, setShowDropdown] = useState(false);
  const buttonRef = useRef(null);
  useEffect(() => {
    const handleClick = (event) => {
      if (!buttonRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [buttonRef]);
  return (
    <div className="family-input-select ">
      <div
        className="d-flex justify-content-between cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
        ref={buttonRef}
      >
        <div className="px-2">{selected ? data[selected] : "Select"}</div>
        <div className="d-flex">
          {selected && (
            <div onClick={() => onSelect("")}>
              <CloseIcon />
            </div>
          )}
          <div>
            <ArrowDownIcon />
          </div>
        </div>
      </div>
      {showDropdown && (
        <div className="drop-down-window py-1">
          <div className="d-flex flex-column">
            {Object.keys(data).map((item, index) => (
              <div
                className="single-family-item"
                key={index}
                onClick={() => onSelect(item)}
              >
                {data[item]}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
