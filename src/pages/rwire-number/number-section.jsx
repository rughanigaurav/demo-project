/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Checkbox, CheckboxGroup } from "rsuite";
import { getFileContent } from "../../common/number-search";
import { BiUpload } from "react-icons/bi";
import "../../../src/assets/css/style.scss";
import { RwireSelectInput } from "./rwire-select-input";
import "./rwire-number-search.scss";

const fields = {
  PN: "Publication",
  AN: "Application",
  PRN: "Priority",
};

const includeFields = {
  BCP: "Backward Citation",
  FCP: "Forword Citation",
  BOTH: "Both Citation",
  SF: "Simple Family",
  MF: "Main Family",
  DF: "Domestic Family",
  CF: "Complete Family",
  EF: "Extended Family",
  ALLFAM: "All Families",
};

const NumberSection = (props) => {
  const { onSetApp, selectedFieldes, onSetNumber, fileName, onSetQuery, selectedNumberFilter, setCheckboxError, checkboxError } = props;
  const [selected, setSelected] = useState(selectedNumberFilter);
  const [sizeError, setSizeError] = useState("");
  const [typeError, setTypeError] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file.size > 2000000) {
      return setSizeError("File is greater then 2Mb.");
    }

    if (file.type === "text/plain" || file.type === "text/csv") {
      setSizeError("");
      setTypeError("");
      onSetNumber({ fileName: file.name, isNumberSearch: false });
      let data = await getFileContent(file);
      data = data.match(/\b[a-zA-Z]*\s*\d+\s*[a-zA-Z]*\d*\b/gm);
      data = data
        .join(",")
        .replaceAll("\n", ",")
        .replaceAll("\r", "")
        .replaceAll(/,+/g, ",");
      onSetQuery(data);
    } else {
      return setTypeError("File is not supported.");
    }
  };

  const handleChange = (value) => {
    if (value.length >= 1) {
      setCheckboxError("");
      onSetNumber({ selectedFieldes: value });
    } else {
      setCheckboxError("Please select atleast one type");
      setTimeout(() => {
        setCheckboxError("");
      }, 3000);
    }
  };

  const handleSelect = (value) => {
    setSelected(value);
    let fields = [];
    if (value === "BOTH") {
      fields.push("BCP", "FCP");
    } else if (value === "ALLFAM") {
      fields.push("SF", "MF", "DF", "CF", "EF");
    } else {
      fields.push(value);
    }
    onSetApp({ selectedIncludes: fields, selectedNumberFilter: value });
  };
  return (
    <div className="number-section">
      <div className="text-left ml-2">
        <span className="label-text">Type</span>
      </div>
      <div className="d-flex radio-types-flex">
        <CheckboxGroup
          inline
          name="checkboxList"
          value={selectedFieldes}
          onChange={handleChange}
        >
          {Object.keys(fields).map((item, k) => {
            return (
              <div key={k}>
                <Checkbox key={item} value={item}>
                  {fields[item]}
                </Checkbox>
              </div>
            );
          })}
        </CheckboxGroup>
      </div>
      <div style={{ position: "relative" }}>
        {checkboxError && <div className="checkbox-error-msg">{checkboxError}</div>}
      </div>
      <div className="text-left ml-2 mt-4">
        <span className="label-text">Includes</span>
      </div>
      <div className="select-div ">
        <RwireSelectInput
          data={includeFields}
          onSelect={handleSelect}
          selected={selected}
        />
      </div>

      <div className="text-left ml-2 mt-2">
        <span className="label-text">File</span>
      </div>
      <div className="d-flex ml-2 mt-1 file-upload">
        <input type="file" onChange={handleFileChange} />
        <div className="upload-btn">
          <BiUpload alt="edit" className="img-fluid" width="30" height="30" />
          Upload
        </div>
        <div className="file-name" title={fileName}>
          {fileName ? `${fileName}` : "<File name>"}
        </div>
      </div>
      <div className="text-left ml-2 mt-3 file-size">
        <div id="final-result"></div>
        <div id="exceed-file-limit" className="text-danger"></div>
        <span id="final-result">
          (File Type: only TXT, CSV is allowed upto 2MB)
        </span>

        {sizeError && <div className="error">{sizeError}</div>}
        {typeError && <div className="error">{typeError}</div>}
      </div>
    </div>
  );
};
export default NumberSection;
