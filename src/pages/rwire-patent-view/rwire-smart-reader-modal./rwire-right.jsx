import React, { useEffect, useState } from "react";
import Select from "react-select";
import ClaimsBlock from "../claims-block";
import DescBlock from "../desc-block";
import RwireGallary from "../rwire-view-modal-subsections/rwire-gallary";
import RwireOtherBlock from "../rwire-view-modal-subsections/rwire-other-block";
import RwireSummaryBlock from "../rwire-view-modal-subsections/rwire-summary-block";
import { Radio, RadioGroup } from "rsuite";
import { containsDependentClaims } from "../claims-only";
import { removeTagNames } from "../../../action/patent-view";
import { languages_code } from "../../../resources/data/language-codes";

const sections = [
  { value: "Summary", label: "Summary" },
  { value: "Claims", label: "Claims" },
  { value: "Description", label: "Description" },
  { value: "Others", label: "Others" },
  { value: "Images", label: "Images" },
];
const Styles = {
  control: (base, state) => ({
    ...base,
    border: "1px solid #aeaeae",
    borderRadius: "10px",
    boxShadow: "none",
    "&:hover": {
      border: "1px solid #aeaeae",
    },
  }),
};

function RwireRight(props) {
  const {
    languageSelected,
    detailsData,
    isViewPageModalOpen,
    isSmartReaderOpen,
  } = props;
  const [selectedSection, setSelectedSection] = useState("");
  const [depClaimCheck, setDepClaimCheck] = useState(false);
  const [selectedCountryCodes, setSelectedCountryCodes] = useState(["all"]);

  useEffect(() => {
    if (isSmartReaderOpen) {
      setSelectedSection("Claims");
    } else if (isViewPageModalOpen) {
      setSelectedSection("Images");
    }
  }, [isViewPageModalOpen, isSmartReaderOpen]);

  const handleChange = (e) => {
    setSelectedSection(e.value);
  };
  const getDesc = (str) => {
    if (str.length === 0) {
      return null;
    } else {
      return removeTagNames(str[0]);
    }
  };

  const handleChecked = (e) => {
    setDepClaimCheck(e.target.checked);
  };
  // eslint-disable-next-line array-callback-return
  const filteredClaims = detailsData["CLN"].filter((claim) => {
    if (depClaimCheck) {
      if (
        selectedCountryCodes.length > 0 &&
        selectedCountryCodes[0] !== "all"
      ) {
        const claimCountryCodes = claim.CLT ? claim.CLT.match(/[A-Z]{2}/g) : [];
        return (
          selectedCountryCodes.some((code) =>
            claimCountryCodes.includes(code)
          ) &&
          claim.INDP === "true" &&
          claim.LG === languages_code[languageSelected]
        );
      } else
        return (
          claim.INDP === "true" && claim.LG === languages_code[languageSelected]
        );
    } else {
      if (
        selectedCountryCodes.length > 0 &&
        selectedCountryCodes[0] !== "all"
      ) {
        const claimCountryCodes = claim.CLT ? claim.CLT.match(/[A-Z]{2}/g) : [];
        return (
          selectedCountryCodes.some((code) =>
            claimCountryCodes.includes(code)
          ) && claim.LG === languages_code[languageSelected]
        );
      } else {
        return claim.LG === languages_code[languageSelected];
      }
    }
  });
  const uniqueCountryCodes = [
    ...new Set(
      detailsData["CLN"]
        .filter(
          (claim) => claim.LG === languages_code[languageSelected] && claim.CLT
        )
        .flatMap((claim) => claim.CLT.match(/[A-Z]{2}/g))
    ),
  ];
  const handleCountryChange = (e) => {
    setSelectedCountryCodes([e]);
  };

  return (
    <div className="side ps-2 d-flex flex-column">
      <div className="d-flex mt-2">
        {isSmartReaderOpen && (
          <Select
            className="section-select me-4"
            styles={Styles}
            options={sections}
            defaultValue={sections[1]}
            onChange={handleChange}
            isSearchable={false}
          />
        )}
        {isViewPageModalOpen && (
          <Select
            className="section-select me-4"
            styles={Styles}
            options={sections}
            defaultValue={sections[4]}
            onChange={handleChange}
            isSearchable={false}
          />
        )}

        {selectedSection === "Claims" && (
          <div className="d-flex align-items-center">
            {containsDependentClaims(detailsData["CLN"]) && (
              <>
                <input
                  type="checkbox"
                  className="me-2"
                  onChange={handleChecked}
                ></input>
                <p className="me-3">Hide dependant claims </p>
              </>
            )}
            <RadioGroup
              className="claims-country-code-picker"
              name="radioList"
              inline
              appearance="picker"
              value={
                selectedCountryCodes.length > 0 ? selectedCountryCodes[0] : []
              }
              onChange={handleCountryChange}
            >
              {uniqueCountryCodes.map((code) => {
                return (
                  <Radio key={code} value={code}>
                    {code}
                  </Radio>
                );
              })}
              {uniqueCountryCodes.length > 0 && (
                <Radio
                  value="all"
                  defaultChecked={
                    selectedCountryCodes[0] === "all" ? true : false
                  }
                >
                  All
                </Radio>
              )}
            </RadioGroup>
          </div>
        )}
      </div>
      <div className="inner">
        {selectedSection === "Summary" && <RwireSummaryBlock {...props} />}
        {selectedSection === "Description" && (
          <DescBlock
            {...props}
            description={getDesc(detailsData[`DESC_${languageSelected}`])}
          />
        )}
        {selectedSection === "Claims" && (
          <ClaimsBlock {...props} filteredClaims={filteredClaims} />
        )}
        {selectedSection === "Others" && <RwireOtherBlock {...props} />}
        {selectedSection === "Images" && <RwireGallary {...props} />}
      </div>
    </div>
  );
}

export default RwireRight;
