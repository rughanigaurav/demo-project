import React from "react";
import { removeTagNames } from "../../action/patent-view";
import SingleClaim from "./singleClaim";

function ClaimsBlock(props) {
  const {
    filteredClaims = [],
    queryKeywordsHighlightColor,
    isExact,
    highlightword,
    userAnnotations = {},
    languageSelected,
  } = props;

  return (
    <div className="claims-block mt-2">
      <div className="d-flex sticky-claims ">
        <h5 className="me-4">Claims</h5>
      </div>
      {filteredClaims.length > 0 ? (
        <div className="mt-2 text-justify fixed-height-claims">
          <ol>
            {filteredClaims.map((claim) => (
              <SingleClaim
                key={claim.id}
                claim={removeTagNames(claim.CL)
                  .replaceAll("<claim-text>", "")
                  .replaceAll("</claim-text>", "")}
                queryKeywordsHighlightColor={queryKeywordsHighlightColor}
                highlightword={highlightword}
                isExact={isExact}
                num={claim.NUM}
                userAnnotations={userAnnotations}
                claimClass={`highlighted-component-modal-cl${claim.NUM}`}
                claimNo={`CL_${languageSelected}_${claim.NUM}`}
              ></SingleClaim>
            ))}
          </ol>
        </div>
      ) : (
        <p className="pt-2">Data not available</p>
      )}
    </div>
  );
}

export default ClaimsBlock;
