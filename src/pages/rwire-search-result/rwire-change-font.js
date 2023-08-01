import React, { useEffect, useState } from "react";
import PlusRoundIcon from "@rsuite/icons/PlusRound";
import MinusRoundIcon from "@rsuite/icons/MinusRound";
import {
  getFontSizes,
  getPatentInfoFontSizes,
  getPubNoFontSizes,
  setDefaultFontSize,
} from "../../common/utils";

const RwireChangeFont = (props) => {
  const { patentReamainingList, patentInformationList } = props;
  const [currentFontSize, setCurrentFontSize] = useState(getFontSizes()[0]);
  const [maximumFontSize, setMaximumFontSize] = useState(getFontSizes()[1]);
  const [currentPubNoFontSize, setCurrentPubNoFontSize] = useState(
    getPubNoFontSizes()[0]
  );
  const [maximumPubNoFontSize, setMaximumPubNoFontSize] = useState(
    getPubNoFontSizes()[1]
  );
  const [currentPatentInfoFontSize, setCurrentPatentInfoFontSize] = useState(
    getPatentInfoFontSizes()[0]
  );
  const [maximumPatentInfoFontSize, setMaximumPatentInfoFontSize] = useState(
    getPatentInfoFontSizes()[1]
  );

  useEffect(() => {
    setDefaultFontSize();
  }, []);
  const setDeafaultStateOnResize = () => {
    setCurrentFontSize(getFontSizes()[0]);
    setMaximumFontSize(getFontSizes()[1]);
    setCurrentPubNoFontSize(getPubNoFontSizes()[0]);
    setMaximumPubNoFontSize(getFontSizes()[1]);
    setCurrentPatentInfoFontSize(getPatentInfoFontSizes()[0]);
    setMaximumPatentInfoFontSize(getPatentInfoFontSizes()[1]);
    setDefaultFontSize();
  };
  useEffect(() => {
    window.addEventListener("resize", setDeafaultStateOnResize);
    return () => {
      window.removeEventListener("resize", setDeafaultStateOnResize);
    };
  });

  useEffect(() => {
    setDefaultFontSize(
      currentFontSize,
      currentPubNoFontSize,
      currentPatentInfoFontSize
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patentReamainingList, patentInformationList]);

  setTimeout(() => {
    setDefaultFontSize(
      currentFontSize,
      currentPubNoFontSize,
      currentPatentInfoFontSize
    );
  }, 200);

  const increaseFontSize = () => {
    const dynamicHeightElements = document.querySelectorAll(".dynamic-height");
    const dynamicHeightPubNo = document.querySelectorAll(
      ".dynamic-height-pubNo"
    );
    const detailsElements = document.querySelectorAll(".result-page-details");
    const detailsHeaderElements = document.querySelectorAll(
      ".details-header-result"
    );
    if (currentFontSize < maximumFontSize) {
      dynamicHeightElements.forEach((element) => {
        const newFontSize = currentFontSize + 2;
        element.style.fontSize = `${newFontSize}px`;
      });
      setCurrentFontSize((prevFontSize) => prevFontSize + 2);
    }
    if (currentPubNoFontSize < maximumPubNoFontSize) {
      dynamicHeightPubNo.forEach((element) => {
        const newFontSize = currentPubNoFontSize + 2;
        element.style.fontSize = `${newFontSize}px`;
      });
      setCurrentPubNoFontSize((prevFontSize) => prevFontSize + 2);
    }
    if (currentPatentInfoFontSize < maximumPatentInfoFontSize) {
      detailsElements.forEach((element) => {
        const newFontSize = currentPatentInfoFontSize + 1;
        element.style.fontSize = `${newFontSize}px`;
      });
      detailsHeaderElements.forEach((element) => {
        const newFontSize = currentPatentInfoFontSize + 1;
        element.style.fontSize = `${newFontSize}px`;
      });
      setCurrentPatentInfoFontSize((prevFontSize) => prevFontSize + 1);
    }
  };

  const decreaseFontSize = () => {
    const dynamicHeightElements = document.querySelectorAll(".dynamic-height");
    const dynamicHeightPubNo = document.querySelectorAll(
      ".dynamic-height-pubNo"
    );
    const detailsElements = document.querySelectorAll(".result-page-details");
    const detailsHeaderElements = document.querySelectorAll(
      ".details-header-result"
    );
    if (currentFontSize > getFontSizes()[0]) {
      dynamicHeightElements.forEach((element) => {
        const newFontSize = currentFontSize - 2;
        element.style.fontSize = `${newFontSize}px`;
      });
      setCurrentFontSize((prevFontSize) => prevFontSize - 2);
    }
    if (currentPubNoFontSize > getPubNoFontSizes()[0]) {
      dynamicHeightPubNo.forEach((element) => {
        const newFontSize = currentPubNoFontSize - 2;
        element.style.fontSize = `${newFontSize}px`;
      });
      setCurrentPubNoFontSize((prevFontSize) => prevFontSize - 2);
    }
    if (currentPatentInfoFontSize > getPatentInfoFontSizes()[0]) {
      detailsElements.forEach((element) => {
        const newFontSize = currentPatentInfoFontSize - 1;
        element.style.fontSize = `${newFontSize}px`;
      });
      detailsHeaderElements.forEach((element) => {
        const newFontSize = currentPatentInfoFontSize - 1;
        element.style.fontSize = `${newFontSize}px`;
      });
      setCurrentPatentInfoFontSize((prevFontSize) => prevFontSize - 1);
    }
  };
  return (
    <div className="font-size-changer-buttons">
      <div title="Increase Font Size" onClick={increaseFontSize}>
        <PlusRoundIcon
          className={`font-size-changer-icons ${
            currentFontSize === maximumFontSize ? "inactive" : "active"
          }`}
        />
      </div>
      <div title="Decrease Font Size" onClick={decreaseFontSize}>
        <MinusRoundIcon
          className={`font-size-changer-icons ${
            currentFontSize === getFontSizes()[0] ? "inactive" : "active"
          }`}
        />
      </div>
    </div>
  );
};

export default RwireChangeFont;
