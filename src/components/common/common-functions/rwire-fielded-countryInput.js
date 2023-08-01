import React, { useEffect } from "react";
import RwireFieldedTextarea from "./rwire-fielded-textarea";

const RwireFieldedCountryInput = (props) => {
  const { onChange, onKeyDown, item, index, isCountryInput } = props;


  const getWidth = () => {
    // calculated and set the WIDTH of textarea according to its parent div
    const countrySection = document.querySelector(`.country-input_${index}`);
    const parentDiv = document.querySelector(".country-section");
    const rsBtn = document.querySelector(".rs-btn");
    const countryButtonAction = document.querySelector(
      ".country-button-action"
    );
    const parentWidth = parentDiv && parentDiv.getBoundingClientRect().width;
    const fixedWidth =
      (rsBtn && rsBtn.offsetWidth) +
      (countryButtonAction && countryButtonAction.offsetWidth);
    const remainingWidth = parentWidth - fixedWidth;
    countrySection && (countrySection.style.width = `${remainingWidth}px`);
    const textarea = document.getElementById(`txt_${index}`);
    textarea && (textarea.style.maxWidth = `${remainingWidth}px`);

    // calculated the height of parent div
    const parentHeight = countrySection && countrySection.offsetHeight;
    return parentHeight;
  };
  useEffect(() => {
    window.addEventListener("resize", getWidth);
    return () => {
      window.removeEventListener("resize", getWidth);
    };
  });
  setTimeout(() => {
    getWidth();
  }, 200);


  return (
    <RwireFieldedTextarea
      parentClass={`.country-input_${index}`}
      parentHeight={getWidth()}
      selectorId={`txt_${index}`}
      className="country-search date-search-XX"
      item={item}
      placeholder="E.g. US OR EP"
      isCountry="country"
      onChange={(event) => onChange(event, index, true)}
      onKeyDown={onKeyDown}
      value={item.filedsinput !== " " ? item.filedsinput : ""}
      isCountryInput={isCountryInput}
    />
  );
};

export default RwireFieldedCountryInput;
