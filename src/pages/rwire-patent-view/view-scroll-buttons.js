import React from "react";
import Select from "react-select";
import { MdOutlineLanguage } from "react-icons/md";

const ViewScrollButtons = (props) => {
  const {
    onTop,
    onClassifications,
    onClaims,
    onDescription,
    onFamilies,
    onCitations,
    onLegalEvents,
    onBackToSearch,
    onChange,
  } = props;
  const languages = [
    { value: "EN", label: "English" },
    { value: "FR", label: "French" },
    { value: "KR", label: "Korean" },
    { value: "ES", label: "Spanish" },
    { value: "DE", label: "German" },
    { value: "CN", label: "Chinese" },
    { value: "JP", label: "Japanese" },
  ];
  const languageStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "#000000100",
      border: "none",
    }),
  };
  return (
    <div className="container-fluid view-header-main">
      <div className="container-fluid header-tabs">
        <div className="view-tabs justify-content-between">
          <div>
            <button className="first-btn" onClick={onTop}>
              Top
            </button>
            <button onClick={onClassifications}>Classifications</button>
            <button onClick={onClaims}>Claims</button>
            <button onClick={onDescription}>Description</button>
            <button onClick={onFamilies}>Families</button>
            <button onClick={onCitations}>Citations</button>
            <button onClick={onLegalEvents}>Legal Events</button>
          </div>
          <div className="d-flex">
            <button
              onClick={onBackToSearch}
              style={{ backgroundColor: "#ffcb0c" }}
            >
              Back to search
            </button>
            <div className="language__dropdown d-flex align-items-center">
              <div className="ps-1">
                <MdOutlineLanguage size={20} />
              </div>
              <Select
                className="lang-select"
                classNamePrefix="lang-select"
                styles={languageStyles}
                options={languages}
                defaultValue={languages[0]}
                onChange={onChange}
                isSearchable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewScrollButtons;
