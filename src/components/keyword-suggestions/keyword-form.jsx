import { useState } from "react";
import RWireButton from "../rwire-ui/rwire-button/rwire-button";
import KeywordDropdown from "./keyword-dropdown-field";

const KeywordForm = (props) => {
  const { onSearch, onSetQueryField, queryField } = props;
  const [keyword, setKeyword] = useState("");
  const handleSetValue = (event) => {
    setKeyword(event.target.value);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      onSearch(keyword);
    }
  };

  const isDisable = keyword ? false : true;

  return (
    <div className="form-container">
      <div className="form-inputs">
        <div className="label-suggestion-class label">Keywords</div>
        <div className="input-suggestion-class input">
          <input
            name="keyword"
            className="suggestion-input"
            placeholder="Search a keyword"
            onChange={(event) => handleSetValue(event)}
            onKeyUp={handleKeyUp}
          />
        </div>
      </div>
      <div className="form-action-button">
        <div className="fw-bold pe-3 text-lg-start">Add in:</div>
        <KeywordDropdown
          onSetQueryField={onSetQueryField}
          queryField={queryField}
        />
        <RWireButton
          cNameDiv="search-query ps-2"
          buttonCName={`search-btn input-button-text-form ${
            isDisable ? "disabled" : ""
          }`}
          name="Search"
          onClick={() => onSearch(keyword)}
        />
      </div>
    </div>
  );
};

export default KeywordForm;
