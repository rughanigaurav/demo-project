import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Input } from "rsuite";
import { FaChevronDown } from "react-icons/fa";

const CustomizeListItem = (props) => {
  const {
    word,
    index,
    onSetDetails,
    queryKeywordsHighlightColor = [],
    isQueryKeywords = false,
    scrolled,
  } = props;
  const [color, setColor] = useState(
    isQueryKeywords
      ? queryKeywordsHighlightColor[index]
      : queryKeywordsHighlightColor[index]
  );
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  useEffect(() => {
    setIsOpen(false);
  }, [scrolled]);

  useEffect(() => {
    const handleClick = (event) => {
      if (
        !buttonRef.current.contains(event.target) &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    const handleScroll = () => {
      const dropdownMenu = dropdownRef.current;
      if (
        dropdownMenu &&
        window.scrollY > buttonRef.current.getBoundingClientRect().bottom &&
        window.scrollY > dropdownMenu.getBoundingClientRect().top
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [buttonRef, dropdownRef]);

  const handleButtonClick = () => {
    const buttonPosition = buttonRef.current.getBoundingClientRect();
    const dropdownMenu = dropdownRef.current;
    const modalDimensions = document
      .getElementsByClassName("modalCustomizeFilter")[0]
      .getBoundingClientRect();
    dropdownMenu.style.top = `${buttonPosition.top - modalDimensions.top}px`;
    dropdownMenu.style.left = `${
      buttonPosition.left - modalDimensions.left + buttonPosition.width + 4
    }px`;
    setIsOpen(!isOpen);
  };
  const handleChangeColor = (e) => {
    setColor(e);
    if (isQueryKeywords) {
      const newColors = [...queryKeywordsHighlightColor]; // create a copy of the original array using spread operator
      newColors[index] = e; // update the color code at the specified index
      onSetDetails({ queryKeywordsHighlightColor: newColors });
    } else {
      const newColors = [...queryKeywordsHighlightColor]; // create a copy of the original array using spread operator
      newColors[index] = e; // update the color code at the specified index
      onSetDetails({ queryKeywordsHighlightColor: newColors });
    }
  };

  return (
    <div className="w-100 pl-2 pr-2 customize-listItem">
      <li className="d-flex justify-content-between btn-rel align-items-center w-100">
        <div className="keyword-word">{word}</div>
        <div className="keyword-color">
          <button
            onClick={handleButtonClick}
            ref={buttonRef}
            className="color-btn"
            style={{ backgroundColor: color }}
          >
            <div className="d-flex flex-row-reverse p-2">
              <FaChevronDown className="" />
            </div>
          </button>

          <div
            className={`ColorPickerDropdown-main  ${
              isOpen ? "ColorPickerDropdown-main-block" : ""
            }`}
            ref={dropdownRef}
          >
            <HexColorPicker color={color} onChange={handleChangeColor} />
            <Input
              className="mt-1"
              placeholder="#ab2288"
              value={color}
              onChange={setColor}
            />
          </div>
        </div>
      </li>
    </div>
  );
};

export default CustomizeListItem;
