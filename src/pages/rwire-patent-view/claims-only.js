import React, { useRef, useState } from "react";
import SingleClaim from "./singleClaim";
import { Radio, RadioGroup } from "rsuite";
import { removeTagNames } from "../../action/patent-view";
import { languages_code } from "../../resources/data/language-codes";

export function containsDependentClaims(claimsData) {
  return claimsData.some((claim) => claim.INDP === "false");
}

function ClaimsOnly(props) {
  const {
    claimsData = [],
    highlightword,
    isExact,
    userAnnotations = {},
    queryKeywordsHighlightColor,
    languageSelected = "EN",
  } = props;
  const [selectedCountryCodes, setSelectedCountryCodes] = useState(["all"]);
  const [hideDependentClaims, setHideDependentClaims] = useState(false);
  const radioGroupRef = useRef(null);

  // eslint-disable-next-line array-callback-return
  const filteredClaims = claimsData.filter((claim) => {
    if (hideDependentClaims) {
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
      claimsData
        .filter(
          (claim) => claim.LG === languages_code[languageSelected] && claim.CLT
        )
        .flatMap((claim) => claim.CLT.match(/[A-Z]{2}/g))
    ),
  ];

  const handleChange = (e) => {
    setSelectedCountryCodes([e]);
  };

  return (
    <>
      <div className="only-claim-section">
        <div className="d-flex">
          <h5 className="me-4">Claims</h5>
          {containsDependentClaims(claimsData) && (
            <>
              <input
                type="checkbox"
                className="me-2"
                checked={hideDependentClaims}
                onChange={(e) => setHideDependentClaims(e.target.checked)}
              ></input>
              <p className="me-3">Hide dependant claims </p>
            </>
          )}
          <div>
            <RadioGroup
              className="claims-country-code-picker"
              name="radioList"
              inline
              ref={radioGroupRef}
              appearance="picker"
              value={
                selectedCountryCodes.length > 0 ? selectedCountryCodes[0] : []
              }
              onChange={handleChange}
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
        </div>
        {claimsData && claimsData.length > 0 ? (
          <div className="mt-3 text-justify position-relative ">
            <ol className="claims-text d-flex flex-column">
              {filteredClaims.map((claim) => (
                <SingleClaim
                  key={claim.id}
                  claim={removeTagNames(claim.CL)}
                  queryKeywordsHighlightColor={queryKeywordsHighlightColor}
                  highlightword={highlightword}
                  isExact={isExact}
                  userAnnotations={userAnnotations}
                  claimClass={`highlighted-component-cl${claim.NUM}`}
                  claimNo={`CL_${languageSelected}_${claim.NUM}`}
                ></SingleClaim>
              ))}
            </ol>
          </div>
        ) : (
          <p className="pt-2">Data not available</p>
        )}
      </div>
    </>
  );
}

export default ClaimsOnly;
