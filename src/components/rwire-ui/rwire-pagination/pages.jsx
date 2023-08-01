import React from "react";
import "./style.scss";
import { dFlexAlignCenterJustifyCenter } from "../../common/class-name";
import rightArrowIcon from "../../../images/right-arrow-grey.svg";
import leftArrowIcon from "../../../images/left-arrow-grey.svg";
import rightActiveIcon from "../../../images/active-right-arrow.svg";
import leftActiveIcon from "../../../images/active-left-arrow.svg";

const Pages = (props) => {
  const { page, totalPage, onSetPage } = props;

  const leftIcon = parseInt(page) === 1 ? leftArrowIcon : leftActiveIcon;
  const rightIcon =
    parseInt(page) === parseInt(totalPage) ? rightArrowIcon : rightActiveIcon;

  const handleSetPage = (e) => {
    onSetPage(e.target.attributes.value.value);
  };

  const handleNextPage = () => {
    if (parseInt(page) !== parseInt(totalPage)) {
      onSetPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (parseInt(page) !== 1) {
      onSetPage(page - 1);
    }
  };

  return (
    <div className={`pages d-flex ${dFlexAlignCenterJustifyCenter}`}>
      <div
        onClick={handlePrevPage}
        className={`pagination__previous me-2 d-flex ${dFlexAlignCenterJustifyCenter}`}
      >
        <img src={leftIcon} alt="previous" />
      </div>
      {[...Array(totalPage)].map((_, index) => (
        <div key={index} className="pagination__navigate">
          <div className="pagination__page">
            <span>
              <div
                value={index + 1}
                className={`
                  page-number me-2
                  ${dFlexAlignCenterJustifyCenter}
                  ${parseInt(page) === index + 1 ? "selected-page" : ""}
                `}
                onClick={handleSetPage}
              >
                {index + 1}
              </div>
            </span>
          </div>
        </div>
      ))}
      <div
        onClick={handleNextPage}
        className={`pagination__next ${dFlexAlignCenterJustifyCenter}`}
      >
        <img src={rightIcon} alt="next" />
      </div>
    </div>
  );
};
export default Pages;
